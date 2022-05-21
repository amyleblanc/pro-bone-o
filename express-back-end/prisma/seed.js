//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

const {
  rhysArray,
  brysonArray,
  amyArray,
  pets1,
  pets2,
  archivedListings,
  activeListings,
  bookings,
} = require("./seeddata.js");

const prisma = new PrismaClient();

async function main() {
  //loop of new users without dogs
  for (let each of amyArray) {
    await prisma.users.create({
      data: {
        first_name: each.first_name,
        last_name: each.last_name,
        password: each.password,
        email_address: each.email_address,
        postal_code: each.postal_code,
        photo_url: each.photo_url,
        phone_number: String(each.phone_number),
        rating: each.rating,
        is_dog_owner: false,
      },
    });
  }

  for (let each of rhysArray) {
    await prisma.users.create({
      data: {
        first_name: each.first_name,
        last_name: each.last_name,
        password: each.password,
        email_address: each.email_address,
        postal_code: each.postal_code,
        photo_url: each.photo_url,
        phone_number: String(each.phone_number),
        rating: each.rating,
        is_dog_owner: true,
        pets: {
          create: pets2,
        },
      },
    });
  }

  for (let each of brysonArray) {
    await prisma.users.create({
      data: {
        first_name: each.first_name,
        last_name: each.last_name,
        password: each.password,
        email_address: each.email_address,
        postal_code: each.postal_code,
        photo_url: each.photo_url,
        phone_number: String(each.phone_number),
        rating: each.rating,
        is_dog_owner: true,
        pets: {
          create: pets1,
        },
      },
    });
  }

  await prisma.listing.createMany({
    data: activeListings,
  });

  await prisma.listing.createMany({
    data: archivedListings,
  });

  await prisma.booking.createMany({
    data: bookings,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
