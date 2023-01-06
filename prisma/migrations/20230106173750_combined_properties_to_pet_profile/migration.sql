/*
  Warnings:

  - You are about to alter the column `bio` on the `PetProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to drop the `Health` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Health" DROP CONSTRAINT "Health_petProfileId_fkey";

-- AlterTable
ALTER TABLE "PetProfile" ADD COLUMN     "isFixed" BOOLEAN,
ADD COLUMN     "isVaccineCurrent" BOOLEAN,
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(250);

-- DropTable
DROP TABLE "Health";
