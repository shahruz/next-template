import { NextApiHandler } from 'next';
import { TrustedForwarder__factory } from '../../../sdk/factories/TrustedForwarder__factory';
import { Wallet } from 'ethers';
import { providers } from 'ethers';

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
    const wallet = new Wallet(
      process.env.FORWARDER_PRIVATE_KEY as string,
      new providers.JsonRpcProvider(rpcUrl)
    );
    const forwarder = TrustedForwarder__factory.connect(
      forwarderAddress,
      wallet
    );
    const tx = await forwarder.execute(data.message, signature);
    return res.json(tx);
  } else {
    res.send('');
  }
};

export default api;
