/*
  Warnings:

  - You are about to drop the column `xdate` on the `doacoes` table. All the data in the column will be lost.
  - Added the required column `date` to the `doacoes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_doacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "pessoa_id" INTEGER NOT NULL,
    "local_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "doacoes_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "doacoes_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locaisColeta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_doacoes" ("created_at", "id", "local_id", "pessoa_id", "updated_at") SELECT "created_at", "id", "local_id", "pessoa_id", "updated_at" FROM "doacoes";
DROP TABLE "doacoes";
ALTER TABLE "new_doacoes" RENAME TO "doacoes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
