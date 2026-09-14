/*
  Warnings:

  - You are about to alter the column `courseId` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "paymentMethod" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_transactions" ("amount", "courseId", "createdAt", "id", "paymentMethod", "status", "userId") SELECT "amount", "courseId", "createdAt", "id", "paymentMethod", "status", "userId" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
