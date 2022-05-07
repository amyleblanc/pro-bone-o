import prisma from "../prisma";

// POST Create a new pet
//requires data object for pet information
//ex: {first_name: 'Mr.', last_name: 'Bojangles'}
export default async function createpet(petData) {
  const pet = await prisma.pets.create({
    data: petData,
  });
  return pet;
}

// GET /api/pets/:id
//get single pet from id
//requires id
export default async function getPet(petID) {
  const pet = await prisma.pets.findUnique({
    where: { id: Number(userID) },
  });
  return pet;
}

// DELETE /api/pets/:id
// Deletes a single pet from the database and returns the database
//may not be using this one - may just be 'hiding' a pet, as they are connected to so many other data areas
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
