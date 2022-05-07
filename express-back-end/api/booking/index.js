const { prisma } = require("../prisma");

// GET all bookings
// Required fields in body: none
async function allbookings() {
  const booking = await prisma.booking.findMany();
  return booking;
}

// GET all bookings with typefilter (sitter or non-sitter)
// Required fields in body: none; optional: isSitterListing {boolean}
async function allbookingsFilter(sitterListing) {
  const isSitterListing = sitterListing ? sitterListing : false;
  const booking = await prisma.booking.findMany({
    include: { listing: { where: { sitter_booking: isSitterListing } } },
  });
  return booking;
}

module.exports = { allbookings, allbookingsFilter };
