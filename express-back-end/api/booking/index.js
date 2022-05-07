import prisma from "../prisma";

// GET all bookings
// Required fields in body: none
export default async function allbookings(isSitterListing) {
  const booking = await prisma.booking.findMany();
  return booking;
};

// GET all bookings with typefilter (sitter or non-sitter)
// Required fields in body: none; optional: isSitterListing {boolean}
export default async function allbookings(isSitterListing) {
  const isSitterListing = sitterListing ? sitterListing : false;
  const booking = await prisma.booking.findMany({
    include: { listing: {where: {sitter_booking: isSitterListing }} },
  });
  return booking;
}