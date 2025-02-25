import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Rating {
    static async create(clientId, reservationId, rating, comment) {
        prisma.ratings.create({
            clientId: clientId,
            reservation_id: reservationId,
            rate: rating,
            comment: comment,
        });
        console.log(
            `Rating saved: Client ${clientId}, Reservation ${reservationId}, Rating ${rating}, Comment ${comment}`
        );
    }

    static async viewRatings(clientId) {
        const ratings = prisma.ratings.findMany({
            where: {
                clientId: clientId,
            },
            select: {
                reservation_id: true,
                rate: true,
                comment: true,
            },
        });
        console.log(`Displaying ratings for Client ${clientId}`);
        console.log(ratings);
    }
}
