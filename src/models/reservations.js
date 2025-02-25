import { PrismaClient } from "@prisma/client";
import readline from "readline-sync";
import Room from "./rooms.js";

const prisma = new PrismaClient();

class Reservation {
    async create(clientId) {
        await Room.displayRooms();
        const roomId = readline.questionInt("Escolha um ID de quarto: ");

        const roomExists = await prisma.rooms.findUnique({ where: { id: roomId } });
        if (!roomExists) {
            console.log("O ID do quarto selecionado não existe. Por favor, escolha um ID de quarto válido.");
            return;
        }

        const checkIn = readline.question("Data de check-in (AAAA-MM-DD): ");
        const checkOut = readline.question("Data de check-out (AAAA-MM-DD): ");

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const currentDate = new Date();

        if (checkInDate <= currentDate || checkOutDate <= currentDate) {
            console.log("As datas de check-in e check-out devem ser futuras. Por favor, insira datas válidas.");
            return;
        }

        const existingReservations = await prisma.reservations.findMany({
            where: {
                roomId,
                OR: [
                    {
                        checkIn: { lte: checkOutDate },
                        checkOut: { gte: checkInDate },
                    },
                    {
                        checkIn: { gte: checkInDate, lte: checkOutDate },
                    },
                    {
                        checkOut: { gte: checkInDate, lte: checkOutDate },
                    },
                ],
            },
        });

        if (existingReservations.length > 0) {
            console.log(
                "O quarto já está reservado para as datas selecionadas. Por favor, escolha datas diferentes ou um quarto diferente."
            );
            return;
        }

        await prisma.reservations.create({
            data: { clientId, roomId, status: "Pendente", checkIn: checkInDate, checkOut: checkOutDate },
        });

        console.log("Reserva criada com sucesso!");
    }

    async getByClient(clientId) {
        return await prisma.reservations.findMany({ where: { clientId: clientId }, include: { room: true } });
    }

    async viewMyReservations(clientId) {
        const reservations = await this.getByClient(clientId);
        console.log("\n=== Minhas Reservas ===");
        reservations.forEach((r) =>
            console.log(
                `ID da Reserva: ${r.id} - ${r.room.name} (${
                    r.status
                }) - Check-in: ${r.checkIn.toDateString()} - Check-out: ${r.checkOut.toDateString()}`
            )
        );
    }

    async cancel(clientId) {
        await this.viewMyReservations(clientId);
        const reservationId = readline.questionInt("Digite o ID da reserva para cancelar: ");

        await prisma.reservations.delete({ where: { id: reservationId } });
        console.log("Reserva cancelada!");
    }

    async viewAllReservations() {
        const reservations = await prisma.reservations.findMany({ include: { client: true, room: true } });
        console.log("\n=== Todas as Reservas ===");
        reservations.forEach((r) =>
            console.log(`ID: ${r.id} - Cliente: ${r.client.name} - Quarto: ${r.room.name} - Status: ${r.status}`)
        );
    }

    async updateStatus(reservationId) {
        const reservation = await prisma.reservations.findUnique({ where: { id: reservationId } });
        if (!reservation) {
            console.log("Reserva não encontrada.");
            return;
        }

        const statusOptions = ["Pendente", "Adiada", "Concluída", "Cancelada"];
        console.log("Opções de status:");
        statusOptions.forEach((status, index) => {
            console.log(`${index + 1}. ${status}`);
        });

        const statusIndex = readline.questionInt("Escolha o novo status pelo número: ") - 1;
        if (statusIndex < 0 || statusIndex >= statusOptions.length) {
            console.log("Opção de status inválida.");
            return;
        }

        const newStatus = statusOptions[statusIndex];

        await prisma.reservations.update({
            where: { id: reservationId },
            data: { status: newStatus },
        });

        console.log(`Status da reserva atualizado para: ${newStatus}`);
    }
}

export default new Reservation();
