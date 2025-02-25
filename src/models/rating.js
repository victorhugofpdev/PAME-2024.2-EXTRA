import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Rating {
    static async create(clientId, reservationId, rating, comment) {
        try {
            await prisma.ratings.create({
                data: {
                    client: { connect: { id: clientId } },
                    reservation: { connect: { id: reservationId } },
                    rate: rating,
                    comment: comment,
                },
            });

            console.log(
                `Avaliação salva: Cliente ${clientId}, Reserva ${reservationId}, Avaliação ${rating}, Comentário ${comment}`
            );
        } catch (error) {
            console.error("Erro ao salvar avaliação:", error);
        }
    }

    static async viewRatings(clientId) {
        try {
            const ratings = await prisma.ratings.findMany({
                where: {
                    clientId: clientId,
                },
                select: {
                    reservationId: true,
                    rate: true,
                    comment: true,
                },
            });

            console.log(`Exibindo avaliações para o Cliente ${clientId}`);
            console.log(ratings);
        } catch (error) {
            console.error("Erro ao exibir avaliações:", error);
        }
    }
}

export default Rating;
