const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Staff {
    async create(name, username, cpf, email, password) {
        if (!name || !username || !cpf || !email || !password) {
            throw new Error("All fields are required");
        }

        const existingEmail = await prisma.staff.findUnique({ where: { email } });
        if (existingEmail) {
            throw new Error("Email already exists");
        }

        const existingCpf = await prisma.staff.findUnique({ where: { cpf } });
        if (existingCpf) {
            throw new Error("CPF already exists");
        }

        return await prisma.staff.create({
            data: { name, username, cpf, email, password },
        });
    }

    async findByEmail(email) {
        return await prisma.staff.findUnique({ where: { email } });
    }
}

export default new Staff();
