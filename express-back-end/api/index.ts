import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//testing functions
// run npx ts-node index.ts

async function main() {
  const userID = 1;
  const users = await prisma.users.findUnique({
    where: { id: Number(userID) },
  });
  //return users;
  console.log(users);

  const data = { email_address: "test@testmail.com" };

  const newusers = await prisma.users.update({
    where: { id: Number(userID) },
    data: data,
  });
  console.log(newusers);
  // ... you will write your Prisma Client queries here
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
