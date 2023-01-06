/*
  Warnings:

  - You are about to drop the `AllergiesToMedicals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Allergy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicationsToMedicals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vaccine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VaccinesToMedicals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AllergiesToMedicals" DROP CONSTRAINT "AllergiesToMedicals_allergyId_fkey";

-- DropForeignKey
ALTER TABLE "AllergiesToMedicals" DROP CONSTRAINT "AllergiesToMedicals_medicalId_fkey";

-- DropForeignKey
ALTER TABLE "MedicationsToMedicals" DROP CONSTRAINT "MedicationsToMedicals_medicalId_fkey";

-- DropForeignKey
ALTER TABLE "MedicationsToMedicals" DROP CONSTRAINT "MedicationsToMedicals_medicationId_fkey";

-- DropForeignKey
ALTER TABLE "VaccinesToMedicals" DROP CONSTRAINT "VaccinesToMedicals_medicalId_fkey";

-- DropForeignKey
ALTER TABLE "VaccinesToMedicals" DROP CONSTRAINT "VaccinesToMedicals_vaccineId_fkey";

-- DropTable
DROP TABLE "AllergiesToMedicals";

-- DropTable
DROP TABLE "Allergy";

-- DropTable
DROP TABLE "Medication";

-- DropTable
DROP TABLE "MedicationsToMedicals";

-- DropTable
DROP TABLE "Vaccine";

-- DropTable
DROP TABLE "VaccinesToMedicals";
