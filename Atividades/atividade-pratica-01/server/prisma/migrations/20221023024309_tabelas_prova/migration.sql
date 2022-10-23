/*
  Warnings:

  - You are about to drop the column `nome` on the `distribuicoes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_distribuicoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "unidade_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "distribuicoes_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "distribuicoes_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_distribuicoes" ("created_at", "date", "id", "produto_id", "unidade_id", "updated_at") SELECT "created_at", "date", "id", "produto_id", "unidade_id", "updated_at" FROM "distribuicoes";
DROP TABLE "distribuicoes";
ALTER TABLE "new_distribuicoes" RENAME TO "distribuicoes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
