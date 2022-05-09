const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const PORT = 8080;

const prisma = require("./api/prisma");
//const { allUsers } = require("./api/users");
const dataqueries = require("./api/dataqueries");

// express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static("public"));

// Sample GET route
app.get("/api/data", (req, res) => {
  dataqueries.userID
    .getUser(1)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

app.get("/api/listing", (req, res) => {
  dataqueries.listing
    .allListings()
    .then((listing) => {
      res.json(listing);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  dataqueries.userID
    .getUser(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

app.post("/api/listings/create", (req, res) => {
  const listingDetails = req.body;
  console.log(req);
  //update later when id validation in place; number for testing
  //const id = req.session.user_id;
  //const id = 1;
  dataqueries.listingID
    .createlisting(1, listingDetails)
    .then((listingInfo) => {
      res.json(listingInfo);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
