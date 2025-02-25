import readline from "readline-sync";
import argon2 from "argon2";
import Client from "./models/client.js";
import Staff from "./models/staff.js";
import Room from "./models/rooms.js";
import Reservation from "./models/reservations.js";

class System {
    constructor() {
        this.loggedUser = null;
    }

    async initialize() {
        console.log("\n=== Welcome to Hotel F-Luxo ===");
        let option;
        do {
            console.log("\n1. Login\n2. Register\n3. Exit");
            option = readline.questionInt("Choose an option: ");
            switch (option) {
                case 1:
                    await this.login();
                    break;
                case 2:
                    await this.register();
                    break;
                case 3:
                    console.log("Exiting the system...");
                    break;
                default:
                    console.log("Invalid option.");
            }
        } while (option !== 3);
    }

    async login() {
        console.log("\n=== Login ===");
        const email = readline.question("Email: ");
        const password = readline.question("Password: ", { hideEchoBack: true });

        const client = await Client.findByEmail(email);
        const staff = await Staff.findByEmail(email);

        if (client && (await argon2.verify(client.password, password))) {
            this.loggedUser = { type: "client", ...client };
            console.log(`Welcome, ${client.name}!`);
            await this.clientMenu();
        } else if (staff && (await argon2.verify(staff.password, password))) {
            this.loggedUser = { type: "staff", ...staff };
            console.log(`Welcome, ${staff.name} (Staff)!`);
            await this.staffMenu();
        } else {
            console.log("Invalid email or password.");
        }
        console.log("Invalid email or password.");
    }

    async register() {
        console.log("\n=== Register ===");
        console.log("1. Client\n2. Staff");
        const type = readline.questionInt("Choose the user type: ");

        if (type === 1) {
            const name = readline.question("Name: ");
            const cpf = readline.question("CPF: ");
            const email = readline.question("Email: ");
            const password = readline.question("Password: ", { hideEchoBack: true });
            const hashedpassword = await argon2.hash(password);
            const birthDate = readline.question("Birth date (YYYY-MM-DD): ");

            await Client.create(name, birthDate, cpf, email, hashedpassword);
            console.log("Client successfully registered!");
        } else if (type === 2) {
            const name = readline.question("Name: ");
            const cpf = readline.question("CPF: ");
            const email = readline.question("Email: ");
            const password = readline.question("Password: ", { hideEchoBack: true });
            const hashedpassword = await argon2.hash(password);
            const username = readline.question("Username: ");

            await Staff.create(name, username, cpf, email, hashedpassword);
            console.log("Staff successfully registered!");
        } else {
            console.log("Invalid option.");
        }
    }

    async clientMenu() {
        let option;
        do {
            console.log("\n=== Client Menu ===");
            console.log(
                "1. View Rooms\n2. Make a Reservation\n3. Cancel a Reservation\n4. View My Reservations\n5. Logout"
            );
            option = readline.questionInt("Choose an option: ");

            switch (option) {
                case 1:
                    await Room.displayRooms();
                    break;
                case 2:
                    await Reservation.create(this.loggedUser.id);
                    break;
                case 3:
                    await Reservation.cancel(this.loggedUser.id);
                    break;
                case 4:
                    await Reservation.viewMyReservations(this.loggedUser.id);
                    break;
                case 5:
                    console.log("Wich reservation are we rating ?  ");
                    await Reservation.viewAllReservations();
                    const reservationId = readline.questionInt("Reservation ID: ");
                    const rating = readline.questionInt("Rating (1-5): ");
                    const comment = readline.question("Comment: ");
                    await Rating.create(this.loggedUser.id, reservationId, rating, comment);
                    break;
                case 6:
                    await Rating.viewRatings(this.loggedUser.id);
                    break;
                case 7:
                    console.log("Logging out...");
                    this.loggedUser = null;
                    break;
                default:
                    console.log("Invalid option.");
            }
        } while (option !== 5);
    }

    async staffMenu() {
        let option;
        do {
            console.log("\n=== Staff Menu ===");
            console.log("1. View Reservations\n2. Add a Room\n3. Logout");
            option = readline.questionInt("Choose an option: ");

            switch (option) {
                case 1:
                    await Reservation.viewAllReservations();
                    break;
                case 2:
                    await Room.create();
                    break;
                case 3:
                    console.log("Logging out...");
                    this.loggedUser = null;
                    break;
                default:
                    console.log("Invalid option.");
            }
        } while (option !== 3);
    }
}

const system = new System();

system.initialize();
