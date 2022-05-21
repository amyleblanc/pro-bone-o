const express = require("express");
const Pusher = require("pusher");
const cors = require("cors");
const app = express();
const BodyParser = require("body-parser");

const Datastore = require("nedb");
const db = new Datastore();

const morgan = require("morgan");
const cookieSession = require("cookie-session");

const prisma = require("./api/prisma");
//const { allUsers } = require("./api/users");
const dataqueries = require("./api/dataqueries");

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const { sendMessage } = require("./services/twilio-sms");

// express Configuration
app.use(cors());
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

const pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  encrypted: true,
});

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

//gets all listings through a listingFilterQuery for the search bar
//currently does not use postal
app.post("/api/listing/filter", (req, res) => {
  const body = req.body;
  console.log(body["type"]);
  console.log(body);
  const { activity, start, end, postal } = body;
  let type = body["type"] !== "sitter-request" ? true : false;
  if (!body["type"]) type = false;
  //const params = req.params;
  //console.log("body:", body);
  //console.log("params:", params);
  dataqueries.listingFilter
    .allFiltersListings(activity, type, start, end)
    .then((listing) => {
      for (let each in listing) {
        if (listing[each]["users"]) delete listing[each]["users"]["password"];
      }
      res.json(listing);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

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
  console.log(id);
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
//update with active user phone number on production
app.post("/api/listings/apply/:id", (req, res) => {
  const listingDetails = req.body;
  const message =
    `A new application for your listing has been submitted by: ${listingDetails.name}.` +
    " For more details please visit the Pro-Bone-O web-app. They sent this message: " +
    listingDetails.personal_message;
  //const phone_number = listingDetails.phone_number;
  const phone_number = process.env.phone_number;
  console.log(phone_number);
  delete listingDetails["name"];
  delete listingDetails["phone_number"];
  //delete listingDetails["personal_message"];
  const userID = req.body.user_id;
  console.log(message);
  dataqueries.bookingID
    .createbooking(userID, listingDetails)
    .then((bookingInfo) => {
      res.json(bookingInfo);
    })
    .then(() => {
      sendMessage(phone_number, message);
    });
});

//used to create a new listing
app.get("/api/listings/bookings/:id", (req, res) => {
  const listing_id = req.params.id;
  //console.log(req);
  //update later when id validation in place; number for testing
  //const id = req.session.user_id;
  //const id = 1;
  dataqueries.listingID
    .getListing(listing_id)
    .then((listingInfo) => {
      console.log(listingInfo);
      res.json(listingInfo);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
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

//allow pulling listings for a specific user
app.get("/user/listings/:id", (req, res) => {
  const userID = req.params.id;
  dataqueries.userID
    .getUserListings(userID)
    .then((userListings) => {
      //console.log(userInfo);
      res.json(userListings);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

app.post("/message", (req, res) => {
  const payload = req.body;
  pusher.trigger("chat", "message", payload);
  res.send(payload);
});

//gets a booking's conversation history
app.get("/booking/comment/:id", (req, res) => {
  const id = req.params.id;
  db.find({ id }, (err, data) => {
    if (err) return res.status(500).send(err);

    res.json(data);
  });
});

//posts a new comment to a booking's conversation history
//update with sendMessage active
app.post("/booking/comment/:id", (req, res) => {
  const id = req.params.id;
  const message = req.body;
  const fullMessage = `${message.name} sent you a message on Pro-Bone-O: ${message.text}`;
  const phone_number = process.env.phone_number;
  db.insert(Object.assign({ id }, req.body), (err, newComment) => {
    dataqueries.bookingID.updatebooking(id, { viewed: false });
    // sendMessage(phone_number, fullMessage);
    if (err) {
      return res.status(500).send(err);
    }
    pusher.trigger(`comments${id}`, `new-comment`, {
      comment: newComment,
    });

    res.status(200).send("OK");
  });
});

//update a booking status
app.put("/booking/status/:id", (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  dataqueries.bookingID
    .updatebooking(id, payload)
    .then((petInfo) => {
      res.json(petInfo);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

//update a listing status
app.put("/listing/status/:id", (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  dataqueries.listingID
    .updateListing(id, payload)
    .then((listingInfo) => {
      res.json(listingInfo);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
