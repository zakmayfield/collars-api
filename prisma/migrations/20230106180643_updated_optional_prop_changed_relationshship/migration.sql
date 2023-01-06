-- DropIndex
DROP INDEX "Address_agencyProfileId_key";

-- DropIndex
DROP INDEX "Contact_agencyProfileId_key";

-- AlterTable
ALTER TABLE "AgencyProfile" ALTER COLUMN "bio" DROP NOT NULL;
