import prisma from "../prisma";

// GET all users
// Required fields in body: none
export default async function allUsers() {
  const users = await prisma.users.findMany();
  return users;
};

module.exports = {allUsers};

// GET dog owners only
// Required fields in body: none
export default async function allOwners() {
  const users = await prisma.users.findMany({
    where: { is_dog_owner: true }
  });
  return users;
}

// GET dog sitters only
// Required fields in body: none
export default async function allSitters() {
  const users = await prisma.users.findMany({
    where: { is_dog_owner: false }
  });
  return users;
}

// GET users above a certain rating (should be duplicated and modified for either dog sitters or owners)
// Required field: rating
export default async function allUsersRanked(rating) {
  const users = await prisma.users.findMany({
    where: {
       rating:{
         gt: rating,
       },
    },
  });
  return users;
}


//module.exports = {allUsers};

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
