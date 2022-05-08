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

app.get("/listings", (req, res) => {
  console.log(res);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
