import { getExpiredGMs, getExpiredFilm } from "@app/features/getExpiredGMs";
import getJsonRpcProvider from "@app/features/getJsonRpcProvider";
import { NextApiHandler } from "next";
import { GmCam__factory } from "sdk/";
import { ethers } from "ethers";

const api: NextApiHandler = async (_req, res) => {
  // fetch expired gms & film from subgraph
  const { gms: expiredGms } = await getExpiredGMs();
  // TODO: types
  const expiredGmIds = expiredGms.map((gm: any) => gm.id);

  const { gmfilms: expiredFilm } = await getExpiredFilm();
  const expiredGmFilmIds = expiredFilm.map((film: any) => film.id);

  if (process.env.PRIVATE_KEY && process.env.GM_CAM_ADDRESS) {
    const signer = new ethers.Wallet(
      process.env.PRIVATE_KEY,
      getJsonRpcProvider()
    );

    // pass to burnExpired on GM.sol
    const gmCam = GmCam__factory.connect(process.env.GM_CAM_ADDRESS, signer);
    let toBurn = expiredGmIds.concat(expiredGmFilmIds);

    if (toBurn.length > 0) {
      console.log("burning tokens", toBurn);
      await gmCam.burnExpired(toBurn);
    }

    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
};

export default api;
