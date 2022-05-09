-- AlterTable
ALTER TABLE "listing" ADD COLUMN     "pet_id" INTEGER;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "listing_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
