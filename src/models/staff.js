import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Staff {
    async create(name, username, cpf, email, password) {
        try {
            if (!name || !username || !cpf || !email || !password) {
                throw new Error("Todos os campos são obrigatórios");
            }

            const existingClientEmail = await prisma.client.findUnique({ where: { cpf } });
            const existingEmail = await prisma.staff.findUnique({ where: { email } });
            if (existingEmail || existingClientEmail) {
                throw new Error("Email já existe");
            }

            const existingClientCpf = await prisma.client.findUnique({ where: { cpf } });
            const existingCpf = await prisma.staff.findUnique({ where: { cpf } });
            if (existingCpf || existingClientCpf) {
                throw new Error("CPF já existe");
            }

            await prisma.staff.create({
                data: { name, username, cpf, email, password },
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    async findByEmail(email) {
        return await prisma.staff.findUnique({ where: { email } });
    }

    async detail(id) {
        try {
            const staff = await prisma.staff.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    cpf: true,
                    email: true,
                },
            });
            if (!staff) {
                throw new Error("Staff not found");
            }
            return staff;
        } catch (error) {
            console.log("Erro inesperado, tentar novamente!");
            return error;
        }
    }
}

export default new Staff();
