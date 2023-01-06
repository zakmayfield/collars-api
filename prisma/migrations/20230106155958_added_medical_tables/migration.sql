-- CreateTable
CREATE TABLE "Medical" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "petProfileId" INTEGER NOT NULL,

    CONSTRAINT "Medical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergy" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllergiesToMedicals" (
    "allergyId" INTEGER NOT NULL,
    "medicalId" INTEGER NOT NULL,

    CONSTRAINT "AllergiesToMedicals_pkey" PRIMARY KEY ("allergyId","medicalId")
);

-- CreateTable
CREATE TABLE "Vaccine" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VaccinesToMedicals" (
    "vaccineId" INTEGER NOT NULL,
    "medicalId" INTEGER NOT NULL,

    CONSTRAINT "VaccinesToMedicals_pkey" PRIMARY KEY ("vaccineId","medicalId")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicationsToMedicals" (
    "medicationId" INTEGER NOT NULL,
    "medicalId" INTEGER NOT NULL,

    CONSTRAINT "MedicationsToMedicals_pkey" PRIMARY KEY ("medicationId","medicalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medical_petProfileId_key" ON "Medical"("petProfileId");

-- AddForeignKey
ALTER TABLE "Medical" ADD CONSTRAINT "Medical_petProfileId_fkey" FOREIGN KEY ("petProfileId") REFERENCES "PetProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllergiesToMedicals" ADD CONSTRAINT "AllergiesToMedicals_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "Allergy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllergiesToMedicals" ADD CONSTRAINT "AllergiesToMedicals_medicalId_fkey" FOREIGN KEY ("medicalId") REFERENCES "Medical"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccinesToMedicals" ADD CONSTRAINT "VaccinesToMedicals_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "Vaccine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccinesToMedicals" ADD CONSTRAINT "VaccinesToMedicals_medicalId_fkey" FOREIGN KEY ("medicalId") REFERENCES "Medical"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationsToMedicals" ADD CONSTRAINT "MedicationsToMedicals_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationsToMedicals" ADD CONSTRAINT "MedicationsToMedicals_medicalId_fkey" FOREIGN KEY ("medicalId") REFERENCES "Medical"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
