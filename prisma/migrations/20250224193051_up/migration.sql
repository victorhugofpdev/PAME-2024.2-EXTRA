/*
  Warnings:

  - You are about to drop the column `birth_date` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `quartoId` on the `Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `camas` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `precoNoite` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthDate` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beds` to the `Rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerNight` to the `Rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservations" DROP CONSTRAINT "Reservations_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Reservations" DROP CONSTRAINT "Reservations_quartoId_fkey";

-- DropIndex
DROP INDEX "Staff_usuario_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "birth_date",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reservations" DROP COLUMN "clienteId",
DROP COLUMN "quartoId",
ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "camas",
DROP COLUMN "descricao",
DROP COLUMN "precoNoite",
ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "pricePerNight" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "usuario",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Staff_username_key" ON "Staff"("username");

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
