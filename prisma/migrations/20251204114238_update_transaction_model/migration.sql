/*
  Warnings:

  - You are about to drop the `purchases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "purchases";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "courseId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "paymentMethod" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
