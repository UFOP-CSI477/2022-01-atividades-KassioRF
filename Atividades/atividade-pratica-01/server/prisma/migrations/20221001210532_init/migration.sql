-- CreateTable
CREATE TABLE "tiposSanguineos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "fator" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "pessoas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "tipo_sanguineo_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pessoas_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pessoas_tipo_sanguineo_id_fkey" FOREIGN KEY ("tipo_sanguineo_id") REFERENCES "tiposSanguineos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "locaisColeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "locaisColeta_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "doacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "pessoa_id" INTEGER NOT NULL,
    "local_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "doacoes_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "doacoes_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locaisColeta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "estados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "cidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "estado_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cidades_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
