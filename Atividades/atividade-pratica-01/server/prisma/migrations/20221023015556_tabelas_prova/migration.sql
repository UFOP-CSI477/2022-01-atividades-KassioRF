-- CreateTable
CREATE TABLE "Distribuicao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "unidade_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Distribuicao_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Distribuicao_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
