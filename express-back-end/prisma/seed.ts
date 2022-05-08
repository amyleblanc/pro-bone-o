import { PrismaClient } from "@prisma/client";
const { usersArray, bookings } = require("./seeddata.js");

import {
  randEmail,
  randFirstName,
  randLastName,
  randPassword,
  randAvatar,
  randAlpha,
  randNumber,
  randDog,
  randSentence,
  randText,
} from "@ngneat/falso";

const prisma = new PrismaClient();

async function main() {
  for (let each of usersArray) {
    const dog = randDog();
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
        is_dog_owner: Math.random() < 0.5,
        pets: {
          create: [
            {
              name: randFirstName(),
              photo_url: `https://dog.ceo/api/breed/${dog}/images/random`,
              breed: dog,
              description: randSentence(),
              difficulty: randNumber({ min: 0, max: 5 }),
            },
          ],
        },
        listing: {
          create: [
            {
              sitter_listing: Math.random() < 0.5,
              activity_type: (Math.random() < 0.5 && "walkies") || "sitting",
              additional_details: randText({ charCount: 20 }),
              postal_code: each.postal_code,
              start_time: "2022-05-06T08:00:00.000Z",
              end_time: "2022-05-07T08:00:00.000Z",
              accepted: Math.random() < 0.5,
              archived: Math.random() < 0.5,
              booking: {
                create: [
                  {
                    rating: randNumber({ min: 0, max: 5 }),
                    review: randText({ charCount: 20 }),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  }

  const loopTotal = 17;
  for (let i = 3; i < loopTotal; i++) {
    const postal =
      randAlpha() +
      randNumber({ min: 0, max: 9 }) +
      randAlpha() +
      randNumber({ min: 0, max: 9 }) +
      randAlpha() +
      randNumber({ min: 0, max: 9 });
    const dog = randDog();
    await prisma.users.create({
      data: {
        first_name: randFirstName(),
        last_name: randLastName(),
        password: randPassword(),
        email_address: randEmail(),
        postal_code: postal,
        photo_url: randAvatar(),
        phone_number: String(randNumber({ min: 1111111111, max: 9999999999 })),
        rating: randNumber({ min: 0, max: 5 }),
        is_dog_owner: Math.random() < 0.5,
        pets: {
          create: [
            {
              name: randFirstName(),
              photo_url: `https://dog.ceo/api/breed/${dog}/images/random`,
              breed: dog,
              description: randSentence(),
              difficulty: randNumber({ min: 0, max: 5 }),
            },
          ],
        },
        listing: {
          create: [
            {
              sitter_listing: Math.random() < 0.5,
              activity_type: (Math.random() < 0.5 && "walkies") || "sitting",
              additional_details: randText({ charCount: 20 }),
              postal_code: postal,
              start_time: "2022-05-06T08:00:00.000Z",
              end_time: "2022-05-07T08:00:00.000Z",
              accepted: Math.random() < 0.5,
              archived: Math.random() < 0.5,
            },
          ],
        },
      },
    });
  }

  await prisma.booking.createMany({
    data: bookings,
  });
  console.log("seeding");
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
