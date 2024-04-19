/*
  Warnings:

  - You are about to drop the column `session_timeout` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `session_token` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "session_timeout",
DROP COLUMN "session_token";
