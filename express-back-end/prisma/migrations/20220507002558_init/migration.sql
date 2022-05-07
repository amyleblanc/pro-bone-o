-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "listing_id" INTEGER,
    "rating" INTEGER,
    "review" VARCHAR(500),

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing" (
    "id" SERIAL NOT NULL,
    "sitter_listing" BOOLEAN,
    "user_id" INTEGER,
    "activity_type" VARCHAR(100),
    "additional_details" VARCHAR(200),
    "postal_code" VARCHAR(6),
    "start_time" TIMESTAMP(6),
    "end_time" TIMESTAMP(6),
    "accepted" BOOLEAN,
    "archived" BOOLEAN,

    CONSTRAINT "listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "name" VARCHAR(250),
    "photo_url" VARCHAR(500),
    "breed" VARCHAR(250),
    "description" VARCHAR(500),
    "difficulty" INTEGER,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(250),
    "last_name" VARCHAR(250),
    "password" VARCHAR(250),
    "email_address" VARCHAR(250),
    "postal_code" VARCHAR(6),
    "photo_url" VARCHAR(500),
    "phone_number" BIGINT,
    "rating" INTEGER,
    "is_dog_owner" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "listing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
