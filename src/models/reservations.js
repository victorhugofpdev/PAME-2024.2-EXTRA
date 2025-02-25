const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const readline = require("readline-sync");
const Room = require("./rooms");

class Reservation {
    async create(clientId) {
        await Room.displayRooms();
        const roomId = readline.questionInt("Choose a room ID: ");
        const checkIn = readline.question("Check-in date (YYYY-MM-DD): ");
        const checkOut = readline.question("Check-out date (YYYY-MM-DD): ");

        // Check if the room is already reserved for the given dates
        const existingReservations = await prisma.reservations.findMany({
            where: {
                roomId,
                OR: [
                    {
                        checkIn: { lte: new Date(checkOut) },
                        checkOut: { gte: new Date(checkIn) },
                    },
                ],
            },
        });

        if (existingReservations.length > 0) {
            console.log(
                "The room is already reserved for the selected dates. Please choose different dates or a different room."
            );
            return;
        }

        await prisma.reservations.create({
            data: { clientId, roomId, status: "pending", checkIn: new Date(checkIn), checkOut: new Date(checkOut) },
        });

        console.log("Reservation successfully created!");
    }

    async getByClient(clientId) {
        return await prisma.reservations.findMany({ where: { clientId }, include: { room: true } });
    }

    async viewMyReservations(clientId) {
        const reservations = await this.getByClient(clientId);
        console.log("\n=== My Reservations ===");
        reservations.forEach((r) => console.log(`Reservation ${r.id} - ${r.room.name} (${r.status})`));
    }

    async cancel(clientId) {
        await this.viewMyReservations(clientId);
        const reservationId = readline.questionInt("Enter the reservation ID to cancel: ");

        await prisma.reservations.delete({ where: { id: reservationId } });
        console.log("Reservation canceled!");
    }

    async viewAllReservations() {
        const reservations = await prisma.reservations.findMany({ include: { client: true, room: true } });
        console.log("\n=== All Reservations ===");
        reservations.forEach((r) =>
            console.log(`ID: ${r.id} - Client: ${r.client.name} - Room: ${r.room.name} - Status: ${r.status}`)
        );
    }
}

export default new Reservation();
