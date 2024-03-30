-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADM', 'USER');

-- AlterTable
ALTER TABLE "users_table" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'USER';
