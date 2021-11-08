import prisma from '@server/helpers/prisma';
import { NextApiHandler } from 'next';

const api: NextApiHandler = async (req, res) => {
  const { address, token }: { address: string; token: string } = req.body;
  await prisma.pushTokens.deleteMany({ where: { token } });
  await prisma.pushTokens.upsert({
    where: { id: address.toLowerCase() },
    create: { id: address.toLowerCase(), token },
    update: { token }
  });
  return res.json({ success: true });
};

export default api;
