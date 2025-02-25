import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import readline from "readline-sync";

class Room {
    async getAll() {
        try {
            return await prisma.rooms.findMany();
        } catch (error) {
            console.error("Erro ao buscar quartos:", error);
            return [];
        }
    }

    async create() {
        try {
            const name = readline.question("Nome do quarto: ");
            const description = readline.question("Descrição do quarto: ");
            const beds = readline.questionInt("Número de camas: ");
            const pricePerNight = readline.questionFloat("Preço por noite: ");

            await prisma.rooms.create({
                data: { name, description, beds, pricePerNight },
            });

            console.log("Quarto adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar quarto:", error);
        }
    }

    async displayRooms() {
        try {
            const rooms = await this.getAll();
            console.log("\n=== Quartos Disponíveis ===");
            rooms.forEach((room) =>
                console.log(`ID: ${room.id} - ${room.name} (${room.beds} camas) - R$${room.pricePerNight}/noite`)
            );
        } catch (error) {
            console.error("Erro ao exibir quartos:", error);
        }
    }
}

export default new Room();
