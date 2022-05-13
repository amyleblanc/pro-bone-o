const rhys = {
  first_name: "Rhys",
  last_name: "Wood",
  email_address: "rhys@mail.com",
  password: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.",
  phone_number: 7783586873,
  postal_code: "V5J5T3",
  photo_url: "https://randomuser.me/api/portraits/men/94.jpg",
  rating: 4.3,
  is_dog_owner: true,
};

const amy = {
  first_name: "Amy",
  last_name: "McCarthy",
  email_address: "Amy@mail.com",
  password: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.",
  phone_number: 7783586873,
  postal_code: "V5T4G6",
  photo_url: "https://randomuser.me/api/portraits/women/44.jpg",
  rating: 4.0,
  is_dog_owner: false,
};

const bryson = {
  first_name: "Bryson",
  last_name: "Best",
  email_address: "BrysonB@mail.com",
  password: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.",
  phone_number: 7783586873,
  postal_code: "V8T4P1",
  photo_url: "https://randomuser.me/api/portraits/men/88.jpg",
  rating: 4.9,
  is_dog_owner: true,
};

const usersArray = [rhys, bryson];

const newUserArray = [amy];

const bookings = [
  {
    user_id: 6,
    listing_id: 1,
    rating: 4,
    review: "Great Walker! would reccomend",
  },
  {
    user_id: 7,
    listing_id: 2,
    rating: 3,
    review: "Does the job :)",
  },
  {
    user_id: 8,
    listing_id: 3,
    rating: 5,
    review: "My dog loves her!",
  },
  {
    user_id: 9,
    listing_id: 4,
    rating: 2,
    review: "Amazing sitter!",
  },
  {
    user_id: 5,
    listing_id: 5,
    rating: 4,
    review: "Great Walker! would reccomend",
  },
  {
    user_id: 11,
    listing_id: 6,
    rating: 3,
    review: "Does the job :)",
  },
  {
    user_id: 14,
    listing_id: 7,
    rating: 5,
    review: "My dog loves her!",
  },
  {
    user_id: 10,
    listing_id: 8,
    rating: 2,
    review: "Amazing sitter!",
  },
  {
    user_id: 9,
    listing_id: 9,
    rating: 4,
    review: "Great Walker! would reccomend",
  },
  {
    user_id: 7,
    listing_id: 10,
    rating: 3,
    review: "Does the job :)",
  },
  {
    user_id: 5,
    listing_id: 11,
    rating: 5,
    review: "My dog loves her!",
  },
  {
    user_id: 9,
    listing_id: 12,
    rating: 2,
    review: "Amazing sitter!",
  },
];

module.exports = { usersArray, bookings, newUserArray };
