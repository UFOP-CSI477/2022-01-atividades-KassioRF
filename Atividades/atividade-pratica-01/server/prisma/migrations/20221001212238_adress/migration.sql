/*
  Warnings:

  - You are about to drop the column `cidade` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Endereco` table. All the data in the column will be lost.
  - Added the required column `cidade_id` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "cidade_id" INTEGER NOT NULL,
    CONSTRAINT "Endereco_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "cidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("complemento", "id", "numero", "rua") SELECT "complemento", "id", "numero", "rua" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
