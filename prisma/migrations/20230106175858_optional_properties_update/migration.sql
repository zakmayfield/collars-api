/*
  Warnings:

  - You are about to alter the column `email` on the `Agency` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `password` on the `Agency` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `token` on the `Agency` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `username` on the `AgencyProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `bio` on the `AgencyProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `birthday` on the `PetProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `coat` on the `PetProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `goodWith` on the `PetProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `personalityType` on the `PetProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `sex` on the `PetProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `token` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `firstName` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `lastName` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `bio` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.

*/
-- AlterTable
ALTER TABLE "Agency" ALTER COLUMN "email" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "token" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "AgencyProfile" ALTER COLUMN "username" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "PetProfile" ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "birthday" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "coat" DROP NOT NULL,
ALTER COLUMN "coat" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "dietRestrictions" DROP NOT NULL,
ALTER COLUMN "goodWith" DROP NOT NULL,
ALTER COLUMN "goodWith" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "isHouseTrained" DROP NOT NULL,
ALTER COLUMN "personalityType" DROP NOT NULL,
ALTER COLUMN "personalityType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "sex" DROP NOT NULL,
ALTER COLUMN "sex" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "weight" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "role" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "token" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(250);
