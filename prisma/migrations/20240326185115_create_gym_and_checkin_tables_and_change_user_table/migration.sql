/*
  Warnings:

  - You are about to drop the column `nome` on the `users_table` table. All the data in the column will be lost.
  - Added the required column `name` to the `users_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_table" DROP COLUMN "nome",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "check_ins_table" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),

    CONSTRAINT "check_ins_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gyms_table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "gyms_table_pkey" PRIMARY KEY ("id")
);
