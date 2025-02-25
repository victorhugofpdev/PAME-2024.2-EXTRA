import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import readline from "readline-sync";

class Room {
    async getAll() {
        return await prisma.rooms.findMany();
    }

    async create() {
        const name = readline.question("Room name: ");

        const existingRoom = await prisma.rooms.findUnique({
            where: { name },
        });

        if (existingRoom) {
            console.log("Room with this name already exists!");
            return;
        }

        const description = readline.question("Room description: ");
        const beds = readline.questionInt("Number of beds: ");
        const pricePerNight = readline.questionFloat("Price per night: ");

        await prisma.rooms.create({
            data: { name, description, beds, pricePerNight },
        });

        console.log("Room successfully added!");
    }

    async displayRooms() {
        const rooms = await this.getAll();
        console.log("\n=== Available Rooms ===");
        rooms.forEach((room) =>
            console.log(`ID: ${room.id} - ${room.name} (${room.beds} beds) - $${room.pricePerNight}/night`)
        );
    }
}

export default new Room();
