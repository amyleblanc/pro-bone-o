import prisma from "../prisma";

// GET a pet and all bookings and listings they have
// Required fields in body: none
export default async function getpetListings(petID) {
  const pet = await prisma.pets.findUnique({
    where: { id: Number(petID) },
    include: { listing: true, booking: true },
  });
  return pet;
}

// GET a pet and all listings they've created
// Required fields in body: none
export default async function getpetListings(petID) {
  const pet = await prisma.pets.findUnique({
    where: { id: Number(petID) },
    include: { listing: true },
  });
  return pet;
}

// GET a pet and all bookings they've accepted
// Required fields in body: none
export default async function getpetListings(petID) {
  const pet = await prisma.pets.findUnique({
    where: { id: Number(petID) },
    include: { booking: true },
  });
  return pet;
}


// GET a pet and their specific listings
// Required fields in body: 'false' for owner or 'true' for sitter
export default async function getpetListingsByType(petID, type) {
  const pet = await prisma.pets.findUnique({
    where: {
      id: Number(petID),
    },
    include: {
      listing: {
        where: {
          sitter_listing: type,
        },
      },
    },
  });
  return pet;
}