const users = require("./users");
const pets = require("./pets");
const booking = require("./booking");
const listing = require("./listing");

const userID = require("./users/[id]");
const petsID = require("./pets/[id]");
const bookingID = require("./booking/[id]");
const listingID = require("./listing/[id]");

module.exports = {
  users,
  userID,
  pets,
  petsID,
  booking,
  bookingID,
  listing,
  listingID,
};

//module.exports = { users, pets, booking, listing };
