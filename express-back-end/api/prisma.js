const Prisma = require("prisma/prisma-client");
const prisma = new Prisma.PrismaClient();
//export default prisma;

module.exports = { prisma };
