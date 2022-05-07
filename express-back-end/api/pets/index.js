import prisma from "../prisma";

// GET all pets
// Required fields in body: none
export default async function allPets() {
  const pets = await prisma.pets.findMany();
  return pets;
};

// GET all pets of a certain breed
// Required fields in body: breed
export default async function certainBreeds(breed) {
  const pets = await prisma.pets.findMany({
    where: {breed: breed}
  });
  return pets;
};

// GET pets above a certain difficulty rating
// Required fields in body: difficulty
export default async function allPetsRanked(difficulty) {
  const pets = await prisma.pets.findMany({
    where: {
       difficulty:{
         gt: difficulty,
       },
    },
  });
  return pets;
}





//STRETCH

/*


// GET users based on location
// Required fields in body: location
export default async function handle(req, res) {
  const users = await prisma.users.findMany({
    where: { postal_code:{

    }}
  })
  res.json(posts)
}

 */
