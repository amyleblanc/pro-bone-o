CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar(250),
  "last_name" varchar(250),
  "password" varchar(250),
  "email_address" varchar(250),
  "postal_code" varchar(6),
  "photo_url" varchar(500),
  "phone_number" bigint,
  "rating" int,
  "is_dog_owner" boolean
);

CREATE TABLE "listing" (
  "id" SERIAL PRIMARY KEY,
  "sitter_listing" boolean,
  "user_id" int,
  "activity_type" varchar(100),
  "additional_details" varchar(200),
  "postal_code" varchar(6),
  "start_time" timestamp,
  "end_time" timestamp,
  "accepted" boolean,
  "archived" boolean,
  "pet_id" int,
);

CREATE TABLE "pets" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "name" varchar(250),
  "photo_url" varchar(500),
  "breed" varchar(250),
  "description" varchar(500),
  "difficulty" int
);

CREATE TABLE "booking" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "listing_id" int,
  "rating" int,
  "review" varchar(500)
);

ALTER TABLE "listing" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "pets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "booking" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "booking" ADD FOREIGN KEY ("listing_id") REFERENCES "listing" ("id");


ALTER TABLE table_name "listing" ADD "pet_id" int;
ALTER TABLE "listing" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("id");