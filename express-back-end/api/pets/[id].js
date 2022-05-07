import prisma from "../prisma";

// GET /api/pets/:id
//get single pet from id
//requires id
export default async function getPet(petID) {
  const pet = await prisma.users.findUnique({
    where: { id: Number(userID) },
  });
  return pet;
}

// DELETE /api/pets/:id
// Deletes a single pet from the database and returns the database
//requires petID for deletion
export default async function deletepet(petID) {
  const pet = await prisma.pets.delete({
    where: { id: Number(petID) },
  });
  return pet;
}

// PUT /api/pets/:id
//requires petID and data as an object
// ex data = {breed: 'pomeranian'}
export default async function updatepet(petID, data) {
  const pet = await prisma.pets.delete({
    where: { id: Number(petID) },
    data: data,
  });
  return pet;
}
