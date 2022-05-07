import prisma from "../prisma";

// GET /api/users/:id
//get single user from id
//requires id
async function getUser(userID) {
  const users = await prisma.users.findUnique({
    where: { id: Number(userID) },
  });
  return users;
}

// DELETE /api/users/:id
// Deletes a single user from the database and returns the database
//requires userID for deletion
async function deleteUser(userID) {
  const users = await prisma.users.delete({
    where: { id: Number(userID) },
  });
  return users;
}

// PUT /api/users/:id
//requires userID and data as an object
// ex data = {email_address: 'thisisnewaddress.com'}
async function updateUser(userID, data) {
  const users = await prisma.users.delete({
    where: { id: Number(userID) },
    data: data,
  });
  return users;
}
