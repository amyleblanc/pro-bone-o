const users = require("./users");
const pets = require("./pets");
const booking = require("./booking");
const listing = require("./listing");

const userID = require("./users/[id]");
const petsID = require("./pets/[id]");
const bookingID = require("./booking/[id]");
const listingID = require("./listing/[id]");

const listingFilter = require("./listing/filterListings");

module.exports = {
  users,
  userID,
  pets,
  petsID,
  booking,
  bookingID,
  listing,
  listingID,
  listingFilter,
};
