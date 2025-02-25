import { PrismaClient } from "@prisma/client";
import readline from "readline-sync";
const prisma = new PrismaClient();

class Client {
    async create(name, birthDate, cpf, email, password) {
        try {
            if (!name || !birthDate || !cpf || !email || !password) {
                throw new Error("Todos os campos são obrigatórios");
            }

            const existingClientByEmail = await prisma.client.findUnique({ where: { email } });
            const existingStaffByEmail = await prisma.staff.findUnique({ where: { email } });
            if (existingClientByEmail || existingStaffByEmail) {
                throw new Error("Email já existe em funcionários ou clientes");
            }

            const existingStaffByCpf = await prisma.staff.findUnique({ where: { cpf } });
            const existingClientByCpf = await prisma.client.findUnique({ where: { cpf } });
            if (existingClientByCpf || existingStaffByCpf) {
                throw new Error("CPF já existe em clientes");
            }
            await prisma.client.create({
                data: { name, birthDate: new Date(birthDate), cpf, email, password },
            });

            return [true];
        } catch (error) {
            return [false, error];
        }
    }

    async findByEmail(email) {
        try {
            return await prisma.client.findUnique({ where: { email } });
        } catch {
            console.log("Erro inesperado, verifique as informações e tente novamente!");
            return;
        }
    }

    async detail(clientId) {
        try {
            if (!clientId) {
                throw new Error("ID do cliente é obrigatório");
            }

            const client = await prisma.client.findUnique({
                where: { id: clientId },
                select: {
                    id: true,
                    name: true,
                    birthDate: true,
                    cpf: true,
                    email: true,
                },
            });
            if (!client) {
                throw new Error("Cliente não encontrado");
            }
            return client;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async getAll() {
        try {
            const clients = await prisma.client.findMany({
                select: {
                    name: true,
                    id: true,
                },
            });
            console.log("\n=== Todos os Clientes ===");
            clients.forEach((client) => console.log(`Nome: ${client.name}; ID do Cliente: ${client.id}`));
            const moreInfo = readline.question("Gostaria de ver mais informações sobre um cliente? (s/n)");
            if (moreInfo.toLowerCase() === "s") {
                const clientId = readline.questionInt("Por favor, insira o ID do Cliente:");
                const clientDetails = await this.detail(clientId);
                if (clientDetails) {
                    console.log("\n=== Detalhes do Cliente ===");
                    console.log(`Nome: ${clientDetails.name}`);
                    console.log(`Data de Nascimento: ${clientDetails.birthDate}`);
                    console.log(`CPF: ${clientDetails.cpf}`);
                    console.log(`Email: ${clientDetails.email}`);
                }
            }
        } catch (error) {
            console.log(error);
            console.log("Erro inesperado, verifique as informações e tente novamente!");
        }
    }
}

export default new Client();
