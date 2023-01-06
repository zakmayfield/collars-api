/*
  Warnings:

  - Added the required column `age` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coat` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietRestrictions` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goodWith` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isHouseTrained` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalityType` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `PetProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PetProfile" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "birthday" TEXT NOT NULL,
ADD COLUMN     "coat" TEXT NOT NULL,
ADD COLUMN     "dietRestrictions" TEXT NOT NULL,
ADD COLUMN     "goodWith" TEXT NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL,
ADD COLUMN     "isHouseTrained" BOOLEAN NOT NULL,
ADD COLUMN     "personalityType" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorsToPetProfiles" (
    "colorId" INTEGER NOT NULL,
    "petProfileId" INTEGER NOT NULL,

    CONSTRAINT "ColorsToPetProfiles_pkey" PRIMARY KEY ("colorId","petProfileId")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "file" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesToPetProfiles" (
    "imageId" INTEGER NOT NULL,
    "petProfileId" INTEGER NOT NULL,

    CONSTRAINT "ImagesToPetProfiles_pkey" PRIMARY KEY ("imageId","petProfileId")
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "breed" TEXT NOT NULL,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreedsToPets" (
    "breedId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "BreedsToPets_pkey" PRIMARY KEY ("breedId","petId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_color_key" ON "Color"("color");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_breed_key" ON "Breed"("breed");

-- AddForeignKey
ALTER TABLE "ColorsToPetProfiles" ADD CONSTRAINT "ColorsToPetProfiles_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorsToPetProfiles" ADD CONSTRAINT "ColorsToPetProfiles_petProfileId_fkey" FOREIGN KEY ("petProfileId") REFERENCES "PetProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesToPetProfiles" ADD CONSTRAINT "ImagesToPetProfiles_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesToPetProfiles" ADD CONSTRAINT "ImagesToPetProfiles_petProfileId_fkey" FOREIGN KEY ("petProfileId") REFERENCES "PetProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreedsToPets" ADD CONSTRAINT "BreedsToPets_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreedsToPets" ADD CONSTRAINT "BreedsToPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
