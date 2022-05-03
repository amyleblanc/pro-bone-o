CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar(250),
  "last_name" varchar(250),
  "password" varchar(250),
  "email_address" varchar(250),
  "postal_code" varchar(6),
  "photo_url" varchar(500),
  "phone_number" bigint,
  "rating" int(5),
  "is_dog_owner" boolean
);

CREATE TABLE "listing" (
  "id" SERIAL PRIMARY KEY,
  "sitter_listing" boolean,
  "user_id" int,
  "listing_pets" int,
  "start_time" timestamp,
  "end_time" timestamp,
  "accepted" boolean,
  "archived" boolean
);

CREATE TABLE "pets" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "name" varchar(250),
  "photo_url" varchar(500),
  "breed" varchar(250),
  "description" varchar(500),
  "difficulty" int(5)
);

CREATE TABLE "booking" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "listing_id" int,
  "rating" int(5)
);

CREATE TABLE "listing_pets" (
  "id" SERIAL PRIMARY KEY,
  "pet_id" int,
  "listing_id" int
);

CREATE TABLE "favourited_pets" (
  "id" SERIAL PRIMARY KEY,
  "pet_id" int,
  "user_id" int
);

CREATE TABLE "favourited_sitters" (
  "id" SERIAL PRIMARY KEY,
  "pet_id" int,
  "user_id" int
);

ALTER TABLE "listing" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "listing" ADD FOREIGN KEY ("listing_pets") REFERENCES "listing_pets" ("id");

ALTER TABLE "pets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "booking" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "booking" ADD FOREIGN KEY ("listing_id") REFERENCES "listing" ("id");

ALTER TABLE "listing_pets" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("id");

ALTER TABLE "listing_pets" ADD FOREIGN KEY ("listing_id") REFERENCES "listing" ("id");

ALTER TABLE "favourited_pets" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("id");

ALTER TABLE "favourited_pets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "favourited_sitters" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("id");

ALTER TABLE "favourited_sitters" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("password") REFERENCES "users" ("last_name");
