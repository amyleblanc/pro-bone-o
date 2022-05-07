import prisma from "../prisma";

// GET /api/users/:id
//get single user from id
//requires id
export default async function getUser(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
  });
  return user;
}

// GET a user and their specific pets
// Required fields in body: none
export default async function getUserPets(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
    include: { pets: true },
  });
  return user;
}

// GET a user and all bookings and listings they have
// Required fields in body: none
export default async function getUserListings(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
    include: { listing: true, booking: true },
  });
  return user;
}

// GET a user and all listings they've created
// Required fields in body: none
export default async function getUserListings(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
    include: { listing: true },
  });
  return user;
}

// GET a user and all bookings they've accepted
// Required fields in body: none
export default async function getUserListings(userID) {
  const user = await prisma.users.findUnique({
    where: { id: Number(userID) },
    include: { booking: true },
  });
  return user;
}


// GET a user and their specific listings
// Required fields in body: 'false' for owner or 'true' for sitter
export default async function getUserListingsByType(userID, type) {
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
export default async function deleteUser(userID) {
  const user = await prisma.users.delete({
    where: { id: Number(userID) },
  });
  return user;
}

// PUT /api/users/:id
//requires userID and data as an object
// ex data = {email_address: 'thisisnewaddress.com'}
export default async function updateUser(userID, data) {
  const user = await prisma.users.delete({
    where: { id: Number(userID) },
    data: data,
  });
  return user;
}
