/*
  Warnings:

  - Added the required column `gym_id` to the `check_ins_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `check_ins_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_ins_table" ADD COLUMN     "gym_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins_table" ADD CONSTRAINT "check_ins_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins_table" ADD CONSTRAINT "check_ins_table_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
