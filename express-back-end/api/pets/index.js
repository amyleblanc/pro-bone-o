const { prisma } = require("../prisma");

// GET all pets
// Required fields in body: none
async function allPets() {
  const pets = await prisma.pets.findMany();
  return pets;
}

// GET all pets of a certain breed
// Required fields in body: breed
async function certainBreeds(breed) {
  const pets = await prisma.pets.findMany({
    where: { breed: breed },
  });
  return pets;
}

// GET pets above a certain difficulty rating
// Required fields in body: difficulty
async function allPetsRanked(difficulty) {
  const pets = await prisma.pets.findMany({
    where: {
      difficulty: {
        gt: difficulty,
      },
    },
  });
  return pets;
}

module.exports = { allPets, certainBreeds, allPetsRanked };

//STRETCH

/*


// GET pets based on location
// Required fields in body: location
export default async function handle(req, res) {
  const pets = await prisma.pets.findMany({
    where: { postal_code:{

    }}
  })
  return pets;
}

 */
