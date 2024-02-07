/*
  Warnings:

  - You are about to drop the `PullOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PullOption" DROP CONSTRAINT "PullOption_pollId_fkey";

-- DropTable
DROP TABLE "PullOption";

-- CreateTable
CREATE TABLE "PollOption" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,

    CONSTRAINT "PollOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
