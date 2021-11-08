import { NextApiHandler } from 'next';
import { TrustedForwarder__factory } from '../../../sdk/factories/TrustedForwarder__factory';
import { utils, Wallet } from 'ethers';
import { providers } from 'ethers';

const PRIVATE_KEYS = [
  process.env.FORWARDER_PRIVATE_KEY_1 as string,
  process.env.FORWARDER_PRIVATE_KEY_2 as string,
  process.env.FORWARDER_PRIVATE_KEY_3 as string,
  process.env.FORWARDER_PRIVATE_KEY_4 as string,
  process.env.FORWARDER_PRIVATE_KEY_5 as string
];

const api: NextApiHandler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type');
  if (req.method == 'POST') {
    const {
      data,
      signature,
      forwarderAddress,
      rpcUrl
    }: {
      data: any;
      signature: string;
      forwarderAddress: string;
      rpcUrl: string;
    } = req.body;

    const privateKey =
      PRIVATE_KEYS[
        parseInt(data.message.from.slice(-2), 16) % PRIVATE_KEYS.length
      ];

    const wallet = new Wallet(
      privateKey,
      new providers.JsonRpcProvider(rpcUrl)
    );
    const forwarder = TrustedForwarder__factory.connect(
      forwarderAddress,
      wallet
    );
    const tx = await forwarder.execute(data.message, signature, {
      gasPrice: utils.parseUnits('35', 'gwei')
    });
    console.log('tx hash', tx.hash);
    return res.json(tx);
  } else {
    res.send('');
  }
};

export default api;
