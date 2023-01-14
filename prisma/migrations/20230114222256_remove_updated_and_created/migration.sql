/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AgencyProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AgencyProfile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Breed` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Breed` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PetProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PetProfile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Species` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Species` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "AgencyProfile" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Breed" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "PetProfile" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Species" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
