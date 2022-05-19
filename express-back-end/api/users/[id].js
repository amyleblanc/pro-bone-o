const { prisma } = require("../prisma");

// POST Create a new user
//requires data object for user information
//ex: {first_name: 'steve', last_name:}
async function createUser(userData) {
  const user = await prisma.users.create({
    data: userData,
  });
  return user;
}

// GET /api/users/:id
//get single user from id
//requires id
async function getUser(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
  });
  return user;
}

// GET /api/users/:id
//get single user from their email address
//requires email address
async function getUserByParam(param) {
  const user = await prisma.users.findMany({
    where: {
      email_address: {
        contains: param,
      },
    },
  });
  return user;
}

// GET a user and their specific pets
// Required fields in body: none
async function getUserPets(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
    include: { pets: true },
  });
  return user;
}

// GET a user and eveything about them
// Required fields in body: userID
async function getUserEverything(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
    include: { pets: true, listing: true, booking: true },
  });
  return user;
}

// GET a user and all bookings and listings they have
// Required fields in body: none
async function getUserListings(userID) {
  const user = await prisma.listing.findMany({
    where: { user_id: Number(userID) },
    include: {
      pets: true,
      users: true,
      booking: {
        include: { users: { select: { first_name: true, last_name: true } } },
      },
    },
  });
  return user;
}

// GET a user and all listings they've created
// Required fields in body: none
async function getUserListingsOnly(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
    include: { listing: true },
  });
  return user;
}

// GET a user and all bookings they've accepted
// Required fields in body: none
async function getUserBookingsOnly(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
    include: { booking: true },
  });
  return user;
}

// GET a user and their specific listings
// Required fields in body: 'false' for owner or 'true' for sitter
async function getUserListingsByType(userID, type) {
  const user = await prisma.users.findUnique({
    where: {
      id: Number(userID),
    },
    include: {
      listing: {
        where: {
          sitter_listing: type,
        },
      },
    },
  });
  return user;
}

// DELETE /api/users/:id
// Deletes a single user from the database and returns the database
//may not be using this one - may just be 'hiding' a user, as they are connected to so many other data areas
//requires userID for deletion
async function deleteUser(userID) {
  const user = await prisma.users.delete({
    where: { id: Number(userID) },
  });
  return user;
}

// PUT /api/users/:id
//requires userID and data as an object
// ex data = {email_address: 'thisisnewaddress.com'}
async function updateUser(userID, data) {
  const user = await prisma.users.update({
    where: { id: Number(userID) },
    data: data,
  });
  return user;
}

module.exports = {
  createUser,
  getUser,
  getUserPets,
  getUserListings,
  getUserListingsByType,
  deleteUser,
  updateUser,
  getUserByParam,
  getUserEverything,
  getUserListingsOnly,
  getUserBookingsOnly,
};
