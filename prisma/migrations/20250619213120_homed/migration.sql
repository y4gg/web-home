/*
  Warnings:

  - You are about to drop the column `name` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `homeLimit` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "homeLimit",
ADD COLUMN     "homeId" TEXT;
