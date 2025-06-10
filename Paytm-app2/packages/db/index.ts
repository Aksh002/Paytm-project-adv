import { PrismaClient } from './generated/prisma';
// Since output is sset in db/generated/prisma, hence we import shit fom there , not "nodemodules/@prisma/client"

const prisma = new PrismaClient();

export default prisma;