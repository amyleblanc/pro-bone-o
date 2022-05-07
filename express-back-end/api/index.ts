import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//testing functions
// run npx ts-node index.ts

async function main() {
  const userID = 6;
  const type = false;
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
    include: { booking: true, listing: true },
  });
  //return users;
  console.log(user);

  // const data = { email_address: "test@testmail.com" };

  // const newusers = await prisma.users.update({
  //   where: { id: Number(userID) },
  //   data: data,
  // });
  // console.log(newusers);
  // ... you will write your Prisma Client queries here
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
