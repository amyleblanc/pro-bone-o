const { prisma } = require("../prisma");

//Super Filter for All Options (to be updated with postal_code search)
// GET ONLY open listings with input searchString in additional details or activity type; can search either sitter listings or dog availability
//Required fields in body: none optional (all): searchString {string}, sitterListing {boolean}, startTime(dateTime), endTime(dateTime), accepted {boolean}, archived {boolean},
async function allFiltersListings(
  searchString,
  sitterListing,
  startTime,
  endTime,
  accepted,
  archived
) {
  const isSitterListing = sitterListing ? sitterListing : false;
  const start = startTime ? startTime : "2010-02-12T08:00:00.000Z";
  const end = endTime ? endTime : "2030-02-12T08:00:00.000Z";
  const acceptedListing = accepted ? accepted : false;
  const archivedListing = archived ? archived : false;
  let searchExists = searchString ? searchString : "";
  if (searchExists === "Anything!") searchExists = "";
  const listings = await prisma.listing.findMany({
    where: {
      sitter_listing: isSitterListing,
      accepted: acceptedListing,
      archived: archivedListing,
      start_time: {
        gt: start,
      },
      end_time: {
        lt: end,
      },
      OR: [
        {
          activity_type: { contains: searchExists },
        },
        {
          additional_details: { contains: searchExists },
        },
      ],
    },
    include: { pets: true, users: true },
  });
  return listings;
}

// GET ONLY open listings with input searchString in additional details or activity type; can search either sitter listings or dog availability
//Required fields in body: searchString {string}; optional: sitterListing {boolean}
async function filterSitterListings(searchString, sitterListing) {
  const isSitterListing = sitterListing ? sitterListing : false;
  const listings = await prisma.listing.findMany({
    where: {
      sitter_listing: isSitterListing,
      accepted: false,
      archived: false,
      OR: [
        {
          activity_type: { contains: searchString },
        },
        {
          additional_details: { contains: searchString },
        },
      ],
    },
  });
  return listings;
}

// GET ONLY OPEN listings requesting a sitter or dog's availaibility posting where start time and/or end time matches selected range
// Required fields in body: none; optional: startTime {dateTime}, endTime {dateTime}, sitterListing {boolean}
async function openRequestsForSitterFilter(startTime, endTime, sitterListing) {
  const start = startTime ? startTime : "2010-02-12T08:00:00.000Z";
  const end = endTime ? endTime : "2010-02-12T08:00:00.000Z";
  const isSitterListing = sitterListing ? sitterListing : false;
  const listings = await prisma.listing.findMany({
    where: {
      sitter_listing: isSitterListing,
      accepted: false,
      archived: false,
      start_time: {
        gt: start,
      },
      end_time: {
        gt: end,
      },
    },
  });
  return listings;
}

module.exports = {
  allFiltersListings,
  openRequestsForSitterFilter,
  filterSitterListings,
};
