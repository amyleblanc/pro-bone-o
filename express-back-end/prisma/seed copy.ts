import { PrismaClient } from "@prisma/client";
const {
  rhysArray,
  bookings,
  brysonArray,
  amyArray,
  pets1,
  pets2,
} = require("./seeddata.js");

const prisma = new PrismaClient();

async function main() {
  //loop of new users without dogs
  for (let each of amyArray) {
    const usersCreate = await prisma.users.create({
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
        pets: {
          connect: { id: petsCreate.id },
        },
      },
    });

    const listingCreate = await prisma.listing.create({
      data: {
        sitter_listing: false,
        activity_type: (Math.random() < 0.5 && "walkies") || "sitting",
        additional_details: randText({ charCount: 20 }),
        postal_code: each.postal_code,
        start_time: start, //"2022-05-06T08:00:00.000Z",
        end_time: end, //"2022-05-07T08:00:00.000Z",
        accepted: Math.random() < 0.5,
        archived: Math.random() < 0.5,
        users: {
          connect: { id: usersCreate.id },
        },
        pets: {
          connect: { id: petsCreate.id },
        },
      },
    });

    await prisma.booking.create({
      data: {
        rating: randNumber({ min: 0, max: 5 }),
        review: randText({ charCount: 20 }),
        listing: {
          connect: { id: listingCreate.id },
        },
        users: {
          connect: { id: usersCreate.id },
        },
      },
    });
  }

  //loop of users with dogs
  for (let each of rhysArray) {
    const usersCreate = await prisma.users.create({
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
          connect: { id: petsCreate.id },
        },
      },
    });

    for (let each of listingArray) {
      const listingCreate = await prisma.listing.create({
        data: {
          sitter_listing: Math.random() < 0.5,
          activity_type: (Math.random() < 0.5 && "walkies") || "sitting",
          additional_details: randText({ charCount: 20 }),
          postal_code: each.postal_code,
          start_time: start, //"2022-05-06T08:00:00.000Z",
          end_time: end, //"2022-05-07T08:00:00.000Z",
          accepted: Math.random() < 0.5,
          archived: Math.random() < 0.5,
          pets: {
            connect: { id: petsCreate.id },
          },
          users: {
            connect: { id: usersCreate.id },
          },
        },
      });
    }

    await prisma.booking.create({
      data: {
        rating: randNumber({ min: 0, max: 5 }),
        review: randText({ charCount: 20 }),
        listing: {
          connect: { id: listingCreate.id },
        },
        users: {
          connect: { id: usersCreate.id },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
