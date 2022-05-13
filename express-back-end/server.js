const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const PORT = 8080;
const morgan = require("morgan");
const cookieSession = require("cookie-session");

const prisma = require("./api/prisma");
//const { allUsers } = require("./api/users");
const dataqueries = require("./api/dataqueries");

// express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

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

//gets all listings through a listingFilterQuery
/*
app.get("/api/listing", (req, res) => {
  const params = req.body;
  console.log(params);
  dataqueries.listingFilter
    .allFiltersListings()
    .then((listing) => {
      res.json(listing);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});
*/

//get all listings with no filtering
app.get("/api/listing", (req, res) => {
  const params = req.body;
  console.log(params);
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

//gets the details of a specific listing
app.get("/api/listing/:id", (req, res) => {
  const listingId = req.params.id;
  console.log(params);
  dataqueries.listingID
    .getListing(listingId)
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

app.get("/login/:id", (req, res) => {
  const id = req.params.id;
  dataqueries.userID
    .getUserEverything(id)
    .then((user) => {
      req.session.user_id = user.id;
      delete user["password"];
      res.json(user);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

app.get("/logout", (req, res) => {
  res.clearCookie("session");
  res.clearCookie("session.sig");
  res.redirect("/");
});

//used to create a new listing
app.post("/api/listings/create", (req, res) => {
  const listingDetails = req.body;
  const userID = req.body.user_id;
  //console.log(req);
  //update later when id validation in place; number for testing
  //const id = req.session.user_id;
  //const id = 1;
  dataqueries.listingID
    .createlisting(userID, listingDetails)
    .then((listingInfo) => {
      res.json(listingInfo);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

//create a new booking
app.post("/api/listings/apply/:id", (req, res) => {
  const listingDetails = req.body;
  const userID = req.body.user_id;
  console.log(listingDetails);
  console.log(userID);
  dataqueries.bookingID
    .createbooking(userID, listingDetails)
    .then((bookingInfo) => {
      res.json(bookingInfo);
    });
});

//register a new  pet on a user (currently using placeholder userID param)
app.post("/api/user/pets/", (req, res) => {
  const petRegistrationDetails = req.body;
  const userID = req.body.user_id;
  dataqueries.petsID
    .createpet(userID, petRegistrationDetails)
    .then((petInfo) => {
      res.json(petInfo);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

//to update with login routing?
//register a new user //email checking for dupe not functional
app.post("/api/user/register", (req, res) => {
  const userRegistrationDetails = req.body;
  dataqueries.userID
    .getUserByParam(userRegistrationDetails.email_address)
    .then((userInfo) => {
      if (userInfo) {
        return null;
      }
    });
  dataqueries.userID
    .createUser(userRegistrationDetails)
    .then((userInfo) => {
      console.log(userInfo);
      req.session.user_id = userInfo.id;
      res.json(userInfo);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

//allow pulling registration information of new user for login
app.get("/api/user/register", (req, res) => {
  const userRegistrationDetails = req.body;
  dataqueries.userID
    .getUserByParam(userRegistrationDetails.email_address)
    .then((userInfo) => {
      console.log(userInfo);
      req.session.user_id = userInfo.id;
      res.json(userInfo);
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
