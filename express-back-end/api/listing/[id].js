import prisma from "../prisma";

// POST Create a new listing
//requires data object for listing information
//ex: {sitter_listing: true, start_time: "2022-05-06T08:00:00.000Z"}
export default async function createlisting(listingData) {
  const listing = await prisma.listing.create({
    data: listingData,
  });
  return listing;
}

// GET listing and included booking and users object from listing id
//requires listingID
export default async function getListing(listingID) {
  const listing = await prisma.listing.findUnique({
    where: { id: Number(listingID) },
    include: { booking: { include: { users: true } } },
  });
  return listing;
}

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

// PUT updates a listing with new information
// can be used to archive a listing
//requires listingID and data as an object
// ex data = {activity_type: 'walkies'}
export default async function updateListing(listingID, data) {
  const listing = await prisma.listing.delete({
    where: { id: Number(listingID) },
    data: data,
  });
  return listing;
}