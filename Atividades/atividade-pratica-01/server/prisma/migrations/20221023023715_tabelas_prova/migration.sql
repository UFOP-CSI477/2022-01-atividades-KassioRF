/*
  Warnings:

  - Added the required column `date` to the `Distribuicao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Distribuicao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "unidade_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Distribuicao_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Distribuicao_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Distribuicao" ("created_at", "id", "nome", "produto_id", "unidade_id", "updated_at") SELECT "created_at", "id", "nome", "produto_id", "unidade_id", "updated_at" FROM "Distribuicao";
DROP TABLE "Distribuicao";
ALTER TABLE "new_Distribuicao" RENAME TO "Distribuicao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
