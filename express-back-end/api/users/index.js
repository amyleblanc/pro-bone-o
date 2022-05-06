import prisma from "../prisma";

// GET all users
// Required fields in body: none
export default async function allUsers(req, res) {
  const users = await prisma.users.findMany();
  res.json(users);
}

// GET dog owners only
// Required fields in body: none
export default async function allOwners(req, res) {
  const users = await prisma.users.findMany({
    where: { is_dog_owner: true }
  });
  res.json(users);
}

// GET dog sitters only
// Required fields in body: none
export default async function allSitters(req, res) {
  const users = await prisma.users.findMany({
    where: { is_dog_owner: false }
  });
  res.json(users);
}



// GET users above a certain rating (should be duplicated and modified for either dog sitters or owners)
// Required fields in body: rating
export default async function allUsersRanked(req, res) {
  //check logic on rating location
  const rating = req.body.rating;
  const users = await prisma.users.findMany({
    where: {
       rating:{
         gt: rating,
       },
    },
  });
  res.json(users);
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
