/*
  Warnings:

  - Made the column `description` on table `gyms_table` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `gyms_table` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "gyms_table" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
