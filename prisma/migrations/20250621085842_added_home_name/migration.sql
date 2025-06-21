/*
  Warnings:

  - Added the required column `name` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "name" TEXT NOT NULL;
