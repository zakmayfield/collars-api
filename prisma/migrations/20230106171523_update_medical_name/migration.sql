/*
  Warnings:

  - You are about to drop the `Medical` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medical" DROP CONSTRAINT "Medical_petProfileId_fkey";

-- DropTable
DROP TABLE "Medical";

-- CreateTable
CREATE TABLE "Health" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isVaccineCurrent" BOOLEAN,
    "isFixed" BOOLEAN,
    "petProfileId" INTEGER NOT NULL,

    CONSTRAINT "Health_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Health_petProfileId_key" ON "Health"("petProfileId");

-- AddForeignKey
ALTER TABLE "Health" ADD CONSTRAINT "Health_petProfileId_fkey" FOREIGN KEY ("petProfileId") REFERENCES "PetProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
