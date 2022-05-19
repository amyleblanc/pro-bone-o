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
  postal_code: "V4R7Y6",
  photo_url: "https://randomuser.me/api/portraits/men/88.jpg",
  rating: 4.9,
  is_dog_owner: true,
};

const usersArray = [rhys, bryson];

const newUserArray = [amy];

//create listings with a user id of 1, 2, or 3
const archivedListings = [
  //requests for sitter
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Dog Sitting",
    additional_details:
      "My puppies need a guardian while me and my partner have a date night tomorrow evening",
    postal_code: "V5Y1P5",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
  //sitter listings
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Dog Sitting",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: true,
    archived: true,
  },
];

const activeListings = [
  //requests for sitter
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Dog Sitting",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: false,
    user_id: 1,
    activity_type: "Dog Sitting",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
  //sitter listings
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Dog Sitting",
    additional_details:
      "Looking for a a walker to take Alfie and Winston out for a few hours! They have been couped up all day",
    postal_code: "V6Y1M8",
    start_time: "20-02-12T08:00:00.000Z",
    end_time: "2018-02-12T08:00:00.000Z",
    accepted: false,
    archived: false,
  },
];

const pets = [
  {
    name: randFirstName(),
    photo_url: dogUrl,
    breed: randomDog,
    description: randSentence(),
    difficulty: randNumber({ min: 0, max: 5 }),
  },
];

//create bookings with a user id of 1, 2, or 3
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
