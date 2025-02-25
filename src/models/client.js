import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Client {
    async create(name, birthDate, cpf, email, password) {
        if (!name || !birthDate || !cpf || !email || !password) {
            throw new Error("All fields are required");
        }

        const existingClientByEmail = await prisma.client.findUnique({ where: { email } });
        if (existingClientByEmail) {
            throw new Error("Email already exists");
        }

        const existingClientByCpf = await prisma.client.findUnique({ where: { cpf } });
        if (existingClientByCpf) {
            throw new Error("CPF already exists");
        }

        return await prisma.client.create({
            data: { name, birthDate: new Date(birthDate), cpf, email, password },
        });
    }

    async findByEmail(email) {
        return await prisma.client.findUnique({ where: { email } });
    }

    async detail(clientId) {
        if (!clientId) {
            throw new Error("Client ID is required");
        }

        const client = await prisma.client.findUnique({ where: { id: clientId } });
        if (!client) {
            throw new Error("Client not found");
        }

        return client;
    }

    async getAll() {
        const clients = await prisma.client.findMany({
            select: {
                name: true,
                clientId: true,
            },
        });
        console.log("\n=== All Clients ===");
        clients.forEach((client) => console.log(`Name: ${client.name}; ClientID: ${client.clientId}`));
    }
}

export default new Client();
//LIST ALL CLIENTS IN MENU AND ASK TO CHOOSE 1 CLIENT ID TO DETAIL WICH WILL BE PASSES TO DETAIL METHOD(THINK ABOUT PUTTING LOG ON METHOD OR ON SYSTEM FUNCTION)
