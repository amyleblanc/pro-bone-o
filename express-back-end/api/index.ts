import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//testing functions
// run npx ts-node index.ts

async function main() {
  const sitterListing = true;
  const startTime = "2010-02-12T08:00:00.000Z";
  const endTime = "2010-02-12T08:00:00.000Z";
  const accepted = false;
  const archived = false;
  const isSitterListing = sitterListing ? sitterListing : false;
  const start = startTime ? startTime : "2010-02-12T08:00:00.000Z";
  const end = endTime ? endTime : "2010-02-12T08:00:00.000Z";
  const acceptedListing = accepted ? accepted : false;
  const archivedListing = archived ? archived : false;
  const searchString = "";
  const listings = await prisma.listing.findMany({
    where: {
      sitter_listing: isSitterListing,
      accepted: acceptedListing,
      archived: archivedListing,
      start_time: {
        gt: start,
      },
      end_time: {
        gt: end,
      },
      OR: [
        {
          activity_type: { contains: searchString },
        },
        {
          additional_details: { contains: searchString },
        },
      ],
    },
    include: { pets: true },
  });
  console.log(listings);

  // const listingID = 6;
  // const startTime = null;
  // const endTime = null;
  // const start = startTime ? startTime : "2010-02-12T08:00:00.000Z";
  // const end = endTime ? endTime : "2010-02-12T08:00:00.000Z";
  // const sitterListing = true;
  // const searchString = "sitting";
  // const isSitterListing = sitterListing ? sitterListing : false;
  // const listing = await prisma.listing.findUnique({
  //   where: { id: Number(listingID) },
  //   include: { booking: true },
  // });
  //return users;
  //console.log(listing);
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
