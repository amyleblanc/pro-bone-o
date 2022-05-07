import prisma from "../prisma";

// GET all listings
// Required fields in body: none
export default async function allListings() {
  const listing = await prisma.listing.findMany();
  return listing;
};

// GET all listings requesting a sitter
// Required fields in body: none
export default async function allRequestsForSitter() {
  const listing = await prisma.listing.findMany({
    where: { sitter_listing: true }
  });
  return listing;
}

// GET all listings advertising a dog's availability only
// Required fields in body: none
export default async function allPetAvailabilityListings() {
  const listing = await prisma.listing.findMany({
    where: { sitter_listing: false }
  });
  return listing;
}

// GET ONLY OPEN listings requesting a sitter
// Required fields in body: none
export default async function openRequestsForSitter() {
  const listing = await prisma.listing.findMany({
    where: { sitter_listing: true, accepted: false, archived: false }
  });
  return listing;
}

// GET ONLY OPEN listings advertising a dog's availability
// Required fields in body: none
export default async function openPetAvailabilityListing() {
  const listing = await prisma.listing.findMany({
    where: { sitter_listing: false, accepted: false, archived: false }
  });
  return listing;
}

