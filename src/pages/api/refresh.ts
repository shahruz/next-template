import { getExpiredGMs, getExpiredFilm } from "@app/features/getExpiredGMs";
import { NextApiHandler } from "next";

const api: NextApiHandler = async (_req, res) => {
  // fetch expired gms & film from subgraph
  const { gms: expiredGms } = await getExpiredGMs();
  console.log({ expiredGms });
  const { gmfilms: expiredFilm } = await getExpiredFilm();
  console.log({ expiredFilm });
  // TODO: pass to burnExpired on GM.sol
  return res.json({ success: true });
};

export default api;
