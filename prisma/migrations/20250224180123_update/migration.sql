-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quartos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "camas" INTEGER NOT NULL,
    "precoNoite" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Quartos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "quartoId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_usuario_key" ON "Funcionario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_cpf_key" ON "Funcionario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "Quartos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
