import { PrismaClient } from "@prisma/client";
const { usersArray, bookings } = require("./seeddata.js");

const { getDogUrl, getSpecificDog } = require("../services/fetchdog");
const dogList = [
  "affenpinscher",
  "african",
  "airedale",
  "akita",
  "appenzeller",
  "australian",
  "shepherd",
  "basenji",
  "beagle",
  "bluetick",
  "borzoi",
  "bouvier",
  "boxer",
  "brabancon",
  "briard",
  "buhund",
  "norwegian",
  "bulldog",
  "boston",
  "english",
  "french",
  "bullterrier",
  "staffordshire",
  "cattledog",
  "australian",
  "chihuahua",
  "chow",
  "clumber",
  "cockapoo",
  "collie",
  "border",
  "coonhound",
  "corgi",
  "cardigan",
  "cotondetulear",
  "dachshund",
  "dalmatian",
  "dane",
  "great",
  "deerhound",
  "scottish",
  "dhole",
  "dingo",
  "doberman",
  "elkhound",
  "norwegian",
  "entlebucher",
  "eskimo",
  "finnish",
  "lapphund",
  "frise",
  "bichon",
  "germanshepherd",
  "greyhound",
  "italian",
  "groenendael",
  "havanese",
  "hound",
  "afghan",
  "basset",
  "blood",
  "english",
  "ibizan",
  "plott",
  "walker",
  "husky",
  "keeshond",
  "kelpie",
  "komondor",
  "kuvasz",
  "labradoodle",
  "labrador",
  "leonberg",
  "lhasa",
  "malamute",
  "malinois",
  "maltese",
  "mastiff",
  "bull",
  "english",
  "tibetan",
  "mexicanhairless",
  "mix",
  "mountain",
  "bernese",
  "swiss",
  "newfoundland",
  "otterhound",
  "ovcharka",
  "caucasian",
  "papillon",
  "pekinese",
  "pembroke",
  "pinscher",
  "miniature",
  "pitbull",
  "pointer",
  "german",
  "germanlonghair",
  "pomeranian",
  "poodle",
  "miniature",
  "standard",
  "toy",
  "pug",
  "puggle",
  "pyrenees",
  "redbone",
  "retriever",
  "chesapeake",
  "curly",
  "flatcoated",
  "golden",
  "ridgeback",
  "rhodesian",
  "rottweiler",
  "saluki",
  "samoyed",
  "schipperke",
  "schnauzer",
  "giant",
  "miniature",
  "setter",
  "english",
  "gordon",
  "irish",
  "sheepdog",
  "english",
  "shetland",
  "shiba",
  "shihtzu",
  "spaniel",
  "blenheim",
  "brittany",
  "cocker",
  "irish",
  "japanese",
  "sussex",
  "welsh",
  "springer",
  "english",
  "stbernard",
  "terrier",
  "american",
  "australian",
  "bedlington",
  "border",
  "cairn",
  "dandie",
  "fox",
  "irish",
  "kerryblue",
  "lakeland",
  "norfolk",
  "norwich",
  "patterdale",
  "russell",
  "scottish",
  "sealyham",
  "silky",
  "tibetan",
  "toy",
  "welsh",
  "westhighland",
  "wheaten",
  "yorkshire",
  "tervuren",
  "vizsla",
  "waterdog",
  "spanish",
  "weimaraner",
  "whippet",
  "wolfhound",
  "irish",
];

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
    const randomDog = dogList[Math.floor(Math.random() * dogList.length)];
    const dogUrl = await getDogUrl(randomDog);
    const petsCreate = await prisma.pets.create({
      data: {
        name: randFirstName(),
        photo_url: dogUrl,
        breed: randomDog,
        description: randSentence(),
        difficulty: randNumber({ min: 0, max: 5 }),
      },
    });

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
        is_dog_owner: Math.random() < 0.5,
        pets: {
          connect: { id: petsCreate.id },
        },
      },
    });

    const listingCreate = await prisma.listing.create({
      data: {
        sitter_listing: Math.random() < 0.5,
        activity_type: (Math.random() < 0.5 && "walkies") || "sitting",
        additional_details: randText({ charCount: 20 }),
        postal_code: each.postal_code,
        start_time: "2022-05-06T08:00:00.000Z",
        end_time: "2022-05-07T08:00:00.000Z",
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

  const loopTotal = 20;
  for (let i = 3; i < loopTotal; i++) {
    const postal =
      "V" +
      randNumber({ min: 5, max: 6 }) +
      randAlpha() +
      randNumber({ min: 0, max: 9 }) +
      randAlpha() +
      randNumber({ min: 0, max: 9 });

    const randomDog = dogList[Math.floor(Math.random() * dogList.length)];
    const dogUrl = await getDogUrl(randomDog);

    const petsCreate = await prisma.pets.create({
      data: {
        name: randFirstName(),
        photo_url: dogUrl, //"https://dog.ceo/api/breeds/image/random",
        breed: randomDog, //randDog(),
        description: randSentence(),
        difficulty: randNumber({ min: 0, max: 5 }),
      },
    });

    const usersCreate = await prisma.users.create({
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
          connect: { id: petsCreate.id },
        },
      },
    });

    const listingCreate = await prisma.listing.create({
      data: {
        sitter_listing: Math.random() < 0.5,
        activity_type: (Math.random() < 0.5 && "walkies") || "sitting",
        additional_details: randText({ charCount: 20 }),
        postal_code: postal,
        start_time: "2022-05-25T08:00:00.000Z",
        end_time: "2022-05-25T10:00:00.000Z",
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
