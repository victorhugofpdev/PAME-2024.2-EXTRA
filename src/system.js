import readline from "readline-sync";
import argon2 from "argon2";
import Client from "./models/client.js";
import Staff from "./models/staff.js";
import Room from "./models/rooms.js";
import Reservation from "./models/reservations.js";
import Rating from "./models/rating.js";

class System {
    constructor() {
        this.loggedUser = null;
    }

    async initialize() {
        console.log("\n=== Bem-vindo ao Hotel F-Luxo ===");
        let option;
        do {
            console.log("\n1. Login\n2. Registrar\n3. Sair");
            option = readline.questionInt("Escolha uma opção: ");
            switch (option) {
                case 1:
                    await this.login();
                    break;
                case 2:
                    await this.register();
                    break;
                case 3:
                    console.log("Saindo do sistema...");
                    break;
                default:
                    console.log("Opção inválida.");
            }
        } while (option !== 3);
    }

    async login() {
        console.log("\n=== Login ===");
        const email = readline.question("Email: ");
        const password = readline.question("Senha: ", { hideEchoBack: true });

        const client = await Client.findByEmail(email);
        const staff = await Staff.findByEmail(email);

        if (client && (await argon2.verify(client.password, password))) {
            this.loggedUser = { type: "client", ...client };
            console.log(`Bem-vindo, ${client.name}!`);
            await this.clientMenu();
        } else if (staff && (await argon2.verify(staff.password, password))) {
            this.loggedUser = { type: "staff", ...staff };
            console.log(`Bem-vindo, ${staff.name} (Staff)!`);
            await this.staffMenu();
        } else {
            console.log("Email ou senha inválidos.");
        }
    }

    async register() {
        console.log("\n=== Registrar ===");
        console.log("1. Cliente\n2. Funcionário");
        const type = readline.questionInt("Escolha o tipo de usuário: ");

        if (type === 1) {
            const name = readline.question("Nome: ");
            const cpf = readline.question("CPF: ");
            const email = readline.question("Email: ");
            const password = readline.question("Senha: ", { hideEchoBack: true });
            const hashedpassword = await argon2.hash(password);
            const birthDate = readline.question("Data de nascimento (AAAA-MM-DD): ");

            const created_user = await Client.create(name, birthDate, cpf, email, hashedpassword);
            if (created_user) {
                console.log("Cliente registrado com sucesso!");
            } else {
                console.log("Falha ao registrar cliente, tente novamente!");
            }
        } else if (type === 2) {
            const name = readline.question("Nome: ");
            const cpf = readline.question("CPF: ");
            const email = readline.question("Email: ");
            const password = readline.question("Senha: ", { hideEchoBack: true });
            const hashedpassword = await argon2.hash(password);
            const username = readline.question("Nome de usuário: ");

            const created_staff = await Staff.create(name, username, cpf, email, hashedpassword);
            if (created_staff) {
                console.log("Funcionário registrado com sucesso!");
            } else {
                console.log("Falha ao registrar funcionário, tente novamente!");
            }
        } else {
            console.log("Opção inválida.");
        }
    }

    async clientMenu() {
        let option;
        do {
            console.log("\n=== Menu do Cliente ===");
            console.log(
                "1. Ver Quartos\n2. Fazer uma Reserva\n3. Cancelar uma Reserva\n4. Ver Minhas Reservas\n5. Avaliar uma Reserva\n6. Ver Minhas Avaliações\n7. Ver Meus Dados\n8. Sair"
            );
            option = readline.questionInt("Escolha uma opção: ");

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
                    await Reservation.viewMyReservations(this.loggedUser.id);
                    console.log("\nQual reserva estamos avaliando?");
                    const reservationId = readline.questionInt("\nID da Reserva: ");
                    const rating = readline.questionInt("Avaliação (1-5): ");
                    const comment = readline.question("Comentário: ");
                    await Rating.create(this.loggedUser.id, reservationId, rating, comment);
                    break;
                case 6:
                    await Rating.viewRatings(this.loggedUser.id);
                    break;
                case 8:
                    console.log("Saindo...");
                    this.loggedUser = null;
                    break;
                case 7:
                    const clientDetails = await Client.detail(this.loggedUser.id);
                    if (clientDetails) {
                        console.log("\n=== Detalhes do Cliente ===");
                        console.log(`Nome: ${clientDetails.name}`);
                        console.log(`Data de Nascimento: ${clientDetails.birthDate}`);
                        console.log(`CPF: ${clientDetails.cpf}`);
                        console.log(`Email: ${clientDetails.email}`);
                    }
                    break;
                default:
                    console.log("Opção inválida.");
            }
        } while (option !== 8);
    }

    async staffMenu() {
        let option;
        do {
            console.log("\n=== Menu do Funcionário ===");
            console.log(
                "1. Ver Reservas\n2. Adicionar um Quarto\n3. Listar Clientes\n4. Ver Meus Dados\n5. Validar Reserva\n6. Sair"
            );
            option = readline.questionInt("Escolha uma opção: ");

            switch (option) {
                case 1:
                    await Reservation.viewAllReservations();
                    break;
                case 2:
                    await Room.create();
                    break;
                case 3:
                    await Client.getAll();
                    break;
                case 6:
                    console.log("Saindo...");
                    this.loggedUser = null;
                    break;
                case 4:
                    const staffDetails = await Staff.detail(this.loggedUser.id);
                    if (staffDetails) {
                        console.log("\n=== Detalhes do Staff ===");
                        console.log(`Nome: ${staffDetails.name}`);
                        console.log(`Data de Nascimento: ${staffDetails.birthDate}`);
                        console.log(`CPF: ${staffDetails.cpf}`);
                        console.log(`Email: ${staffDetails.email}`);
                    }
                    break;
                case 5:
                    await Reservation.viewAllReservations();
                    const reservationtovalidateId = readline.questionInt("\nID da reserva que deseja mudar o status: ");
                    await Reservation.updateStatus(reservationtovalidateId);
                    break;
                default:
                    console.log("Opção inválida.");
            }
        } while (option !== 6);
    }
}

const system = new System();

system.initialize();
