/*
  Warnings:

  - You are about to drop the `Distribuicao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Distribuicao";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "distribuicoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "unidade_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "distribuicoes_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "distribuicoes_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
