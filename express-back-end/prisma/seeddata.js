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
  phone_number: 7783217654,
  postal_code: "V6G1T5",
  photo_url: "https://ibb.co/yyWbL5t",
  rating: 5.0,
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

const pets = [
  {
    name: 'Milo',
    photo_url: 'https://images.dog.ceo/breeds/chow/n02112137_10792.jpg',
    breed: 'Chow',
    description: 'Strong-willed and stubborn, Milo may become the boss of you if you allow him to!',
    difficulty: 3,
  },
  {
    name: 'Rufus',
    photo_url: 'https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191222103956878_COVER.jpg',
    breed: 'Havanese',
    description: 'Rufus is playful, affectionate, intelligent, responsive, companionable, gentle',
    difficulty: 5,
  },
  {
    name: 'Otto',
    photo_url: 'https://images.dog.ceo/breeds/kelpie/n02105412_4948.jpg',
    breed: 'Kelpie',
    description: 'Kelpie is intelligent, friendly, energetic, alert, eager, loyal',
    difficulty: 1,
  },
  {
    name: 'Mr Bigglesworth',
    photo_url: 'https://images.dog.ceo/breeds/labrador/n02099712_5263.jpg',
    breed: 'Labrador',
    description: 'Mr Bigglesworth is outgoing, even tempered, Intelligent, kind, agile, trusting, gentle',
    difficulty: 2,
  },
  {
    name: 'Edgar',
    photo_url: 'https://images.dog.ceo/breeds/pug/n02110958_9642.jpg',
    breed: 'Pug',
    description: 'Edgar is Charming, Playful, Clever, Docile, Mischievous, Sociable, Affectionate, Stubborn, Loving, Attentive, Quiet, Calm',
    difficulty: 1,
  },
  {
    name: 'Floof',
    photo_url: 'https://images.dog.ceo/breeds/shiba/shiba-3i.jpg',
    breed: 'Shiba',
    description: 'Floof is charming, fearless, keen, alert, confident, faithful',
    difficulty: 4,
  },
  {
    name: 'Winson',
    photo_url: 'https://images.dog.ceo/breeds/tervuren/maverick.JPG',
    breed: 'Tervuren',
    description: 'Winston is Attentive, Intelligent, Energetic, Alert, Loyal, Protective',
    difficulty: 1,
  },
  {
    name: 'Alfie',
    photo_url: 'https://images.dog.ceo/breeds/pomeranian/n02112018_3126.jpg',
    breed: 'Pomeranian',
    description: 'Alfie is Playful, Extroverted, Intelligent, Friendly, Sociable, Active',
    difficulty: 5,
  },
  {
    name: 'Burnie',
    photo_url: 'https://images.dog.ceo/breeds/redbone/n02090379_3410.jpg',
    breed: 'Redbone',
    description: 'Burnie is Unflappable, Affectionate, Energetic, Independent, Companionable, Familial',
    difficulty: 4,
  },
  {
    name: 'Acorn',
    photo_url: 'https://images.dog.ceo/breeds/dingo/n02115641_8578.jpg',
    breed: 'Dingo',
    description: 'Acorn is Loyal, Reserved, Gentle, Adaptable, Primitive',
    difficulty: 3,
  },
  {
    name: 'Lilly',
    photo_url: 'https://images.dog.ceo/breeds/beagle/n02088364_9825.jpg',
    breed: 'Beagle',
    description: 'Lilly is Amiable, Even Tempered, Intelligent, Determined, Excitable, Gentle',
    difficulty: 1,
  },
  {
    name: 'Patrick',
    photo_url: 'https://images.dog.ceo/breeds/husky/n02110185_11783.jpg',
    breed: 'Husky',
    description: 'Patrick is Outgoing, Friendly, Intelligent, Alert, Gentle',
    difficulty: 2,
  },
  {
    name: 'Sparkles',
    photo_url: 'https://images.dog.ceo/breeds/pitbull/IMG_20190826_121528_876.jpg',
    breed: 'Pitbull',
    description: 'Sparkles is Friendly, Intelligent, Clownish, Strong Willed, Affectionate, Stubborn, Obedient, Loyal, Gentle, Courageous',
    difficulty: 2,
  },
  {
    name: 'Chonks',
    photo_url: 'https://images.dog.ceo/breeds/akita/Japaneseakita.jpg',
    breed: 'Akita',
    description: 'Chonks is a bold and willful dog, naturally wary of strangers but extremely loyal to his family',
    difficulty: 4,
  },
];

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
      "Open for a walk on the sea wall or maybe in Stanley Park.",
    postal_code: "V6G1T5",
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
      "I'm looking after my friend's dog who would love some company!",
    postal_code: "V6G1T5",
    start_time: "2022-05-14T08:00:00.000Z",
    end_time: "2022-05-14T16:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Dog Sitting",
    additional_details:
      "Will be home all day today",
    postal_code: "V6G1T5",
    start_time: "2022-05-16T09:00:00.000Z",
    end_time: "2022-05-16T18:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Open for a walk on the sea wall or maybe in Stanley Park.",
    postal_code: "V6G1T5",
    start_time: "2022-05-17T18:00:00.000Z",
    end_time: "2022-05-17T20:00:00.000Z",
    accepted: true,
    archived: true,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "I'm looking after my friend's dog who would love some company!",
    postal_code: "V6G1T5",
    start_time: "2022-05-18T10:00:00.000Z",
    end_time: "2022-05-18T13:00:00.000Z",
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
      "Open for a walk on the sea wall or maybe in Stanley Park.",
    postal_code: "V6G1T5",
    start_time: "2022-05-12T08:00:00.000Z",
    end_time: "2022-05-12T10:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "I'm looking after my friend's dog who would love some company!",
    postal_code: "V6G1T5",
    start_time: "2022-05-14T08:00:00.000Z",
    end_time: "2022-05-14T16:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Dog Sitting",
    additional_details:
      "Will be home all day today",
    postal_code: "V6G1T5",
    start_time: "2022-05-16T09:00:00.000Z",
    end_time: "2022-05-16T18:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Walkies",
    additional_details:
      "Open for a walk on the sea wall or maybe in Stanley Park.",
    postal_code: "V6G1T5",
    start_time: "2022-05-17T18:00:00.000Z",
    end_time: "2022-05-17T20:00:00.000Z",
    accepted: false,
    archived: false,
  },
  {
    sitter_listing: true,
    user_id: 1,
    activity_type: "Doggy Date",
    additional_details:
      "I'm looking after my friend's dog who would love some company!",
    postal_code: "V6G1T5",
    start_time: "2022-05-18T10:00:00.000Z",
    end_time: "2022-05-18T13:00:00.000Z",
    accepted: false,
    archived: false,
  },
];

//create bookings with a user id of 1, 2, or 3
const bookings = [
  {
    user_id: 2,
    listing_id: 1,
    rating: 4,
    review: "Great walker! Would recommend.",
  },
  {
    user_id: 2,
    listing_id: 2,
    rating: 4,
    review: "Does the job :)",
  },
  {
    user_id: 3,
    listing_id: 3,
    rating: 5,
    review: "My dog loves her!",
  },
  {
    user_id: 2,
    listing_id: 4,
    rating: 5,
    review: "Amazing sitter!",
  },
  {
    user_id: 3,
    listing_id: 5,
    rating: 4,
    review: "Great walker! Would recommend.",
  },
  {
    user_id: 3,
    listing_id: 6,
    rating: 4,
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
    rating: 5,
    review: "Amazing sitter!",
  },
  {
    user_id: 9,
    listing_id: 9,
    rating: 4,
    review: "Great walker! Would recommend.",
  },
  {
    user_id: 7,
    listing_id: 10,
    rating: 4,
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
    rating: 5,
    review: "Amazing sitter!",
  },
];

module.exports = { usersArray, bookings, newUserArray };
