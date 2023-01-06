/*
  Warnings:

  - You are about to alter the column `address` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `apartment` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `city` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `state` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `country` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `phone` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `email` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `name` on the `Pet` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `species` on the `Pet` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "address" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "apartment" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "state" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "country" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(75);

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "species" SET DATA TYPE VARCHAR(100);
