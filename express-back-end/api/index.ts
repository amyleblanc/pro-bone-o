import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//testing functions
// run npx ts-node index.ts

async function main() {
  const rating = 3;
  const users = await prisma.users.findMany({
    where: {
      rating: {
        gt: rating,
      },
    },
  });
  console.log(users);
  // ... you will write your Prisma Client queries here
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
