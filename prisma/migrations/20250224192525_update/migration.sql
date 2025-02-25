/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Funcionario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quartos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reserva` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_quartoId_fkey";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Funcionario";

-- DropTable
DROP TABLE "Quartos";

-- DropTable
DROP TABLE "Reserva";

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "camas" INTEGER NOT NULL,
    "precoNoite" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservations" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "quartoId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpf_key" ON "Client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_usuario_key" ON "Staff"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_cpf_key" ON "Staff"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
