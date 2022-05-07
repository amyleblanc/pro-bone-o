<<<<<<< HEAD
const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));

// Sample GET route
App.get("/api/data", (req, res) =>
  res.json({
    message: "Seems to work!",
  })
);
=======
const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const PORT = 8080;

// express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static('public'));

// Sample GET route
app.get('/api/data', (req, res) => {
  const users = [
    {
    first_name: 'Rhys', 
    last_name: 'Wood', 
    email_address:'rhys@mail.com', 
    password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 
    phone_number: 7783586873, 
    postal_code: 'V5J5T3', 
    photo_url: 'https://randomuser.me/api/portraits/men/94.jpg', 
    rating: 4.3,
    is_dog_owner: true
  },
    {
    first_name: 'Rhys', 
    last_name: 'Wood', 
    email_address:'rhys@mail.com', 
    password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 
    phone_number: 7783586873, 
    postal_code: 'V5J5T3', 
    photo_url: 'https://randomuser.me/api/portraits/men/94.jpg', 
    rating: 4.3,
    is_dog_owner: true
    }
  ]
>>>>>>> origin/main

  res.json(users)
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
<<<<<<< HEAD
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
=======
  console.log(`express seems to be listening on port ${PORT} so that's pretty good 👍`);
>>>>>>> origin/main
});

