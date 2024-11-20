/*
  Warnings:

  - You are about to drop the column `description` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Banner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "description",
DROP COLUMN "isActive";
