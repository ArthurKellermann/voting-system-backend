-- CreateTable
CREATE TABLE "PullOption" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,

    CONSTRAINT "PullOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PullOption" ADD CONSTRAINT "PullOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
