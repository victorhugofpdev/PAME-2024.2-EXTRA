/*
  Warnings:

  - You are about to drop the column `nascimento` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "nascimento",
DROP COLUMN "nome",
DROP COLUMN "senha",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "nome",
DROP COLUMN "senha",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
