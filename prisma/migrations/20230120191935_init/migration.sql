-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADOPTER', 'VOLUNTEER');

-- CreateEnum
CREATE TYPE "Species" AS ENUM ('CAT', 'DOG', 'BIRD', 'HORSE', 'FISH', 'REPTILE', 'BARNYARD');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('UNKNOWN', 'FEMALE', 'MALE');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('UNKNOWN', 'BLACK', 'WHITE', 'BROWN', 'GOLDEN', 'SPOTTED', 'BRINDLE');

-- CreateEnum
CREATE TYPE "Personality" AS ENUM ('UNKNOWN', 'ACTIVE', 'CURIOUS', 'GOOFY', 'HYPER', 'LAZY', 'LONER');

-- CreateEnum
CREATE TYPE "Diet" AS ENUM ('STANDARD', 'MEDICAL', 'WEIGHT');

-- CreateEnum
CREATE TYPE "Coat" AS ENUM ('UNKNOWN', 'SHORT', 'MEDIUM', 'LONG', 'NONE');

-- CreateEnum
CREATE TYPE "GoodWith" AS ENUM ('UNKNOWN', 'CATS', 'DOGS', 'CHILDREN', 'CATS_AND_DOGS', 'ALL');

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "apartment" VARCHAR(25),
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "zip" INTEGER NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "agencyProfileId" INTEGER,
    "userProfileId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "phone" VARCHAR(50),
    "email" VARCHAR(75),
    "agencyProfileId" INTEGER,
    "userProfileId" INTEGER,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(28) NOT NULL,
    "email" VARCHAR(75) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "token" VARCHAR(256),

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyProfile" (
    "id" SERIAL NOT NULL,
    "bio" VARCHAR(500),
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "AgencyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" VARCHAR(75) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADOPTER',
    "token" VARCHAR(256),
    "agencyId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(50),
    "lastName" VARCHAR(50),
    "bio" VARCHAR(250),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersToPets" (
    "userId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "UsersToPets_pkey" PRIMARY KEY ("userId","petId")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "species" "Species" NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetProfile" (
    "id" SERIAL NOT NULL,
    "age" INTEGER,
    "bio" VARCHAR(250),
    "weight" INTEGER,
    "birthday" VARCHAR(128),
    "isFixed" BOOLEAN,
    "isAvailable" BOOLEAN NOT NULL,
    "isHouseTrained" BOOLEAN,
    "isVaccineCurrent" BOOLEAN,
    "sex" "Sex" DEFAULT 'UNKNOWN',
    "coat" "Coat" DEFAULT 'UNKNOWN',
    "diet" "Diet" DEFAULT 'STANDARD',
    "color" "Color" DEFAULT 'UNKNOWN',
    "goodWith" "GoodWith" DEFAULT 'UNKNOWN',
    "personality" "Personality" DEFAULT 'UNKNOWN',
    "petId" INTEGER NOT NULL,

    CONSTRAINT "PetProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
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
CREATE UNIQUE INDEX "Address_userProfileId_key" ON "Address"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userProfileId_key" ON "Contact"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_name_key" ON "Agency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_email_key" ON "Agency"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyProfile_agencyId_key" ON "AgencyProfile"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PetProfile_petId_key" ON "PetProfile"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_breed_key" ON "Breed"("breed");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_agencyProfileId_fkey" FOREIGN KEY ("agencyProfileId") REFERENCES "AgencyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_agencyProfileId_fkey" FOREIGN KEY ("agencyProfileId") REFERENCES "AgencyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyProfile" ADD CONSTRAINT "AgencyProfile_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToPets" ADD CONSTRAINT "UsersToPets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToPets" ADD CONSTRAINT "UsersToPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetProfile" ADD CONSTRAINT "PetProfile_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesToPetProfiles" ADD CONSTRAINT "ImagesToPetProfiles_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesToPetProfiles" ADD CONSTRAINT "ImagesToPetProfiles_petProfileId_fkey" FOREIGN KEY ("petProfileId") REFERENCES "PetProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreedsToPets" ADD CONSTRAINT "BreedsToPets_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreedsToPets" ADD CONSTRAINT "BreedsToPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
