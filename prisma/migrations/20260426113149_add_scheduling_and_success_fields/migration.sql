-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "closesAt" TIMESTAMP(3),
ADD COLUMN     "maxResponses" INTEGER,
ADD COLUMN     "opensAt" TIMESTAMP(3),
ADD COLUMN     "redirectUrl" TEXT,
ADD COLUMN     "successMessage" TEXT;
