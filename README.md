# **Sistema de Gerenciamento de Reservas**

Este aplicativo é um **sistema de gerenciamento de reservas** que permite aos usuários cadastrar clientes, realizar reservas de quartos e avaliar as estadias. Ele utiliza **Node.js** com **Prisma ORM**, banco de dados **PostgreSQL** e interage via **linha de comando**.

---
## **1. Instalação**

### **1.1 Pré-requisitos**
- **Node.js** (v16 ou superior)
- **NPM** ou **Yarn**

### **1.2 Clonando o projeto e instalando dependências**
1. Clone este repositório:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd <PASTA_DO_PROJETO>
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```

---
## **2. Como Usar**

### **2.1 Executar o Sistema**
Para iniciar o sistema, execute:
```sh
npx node src/system.js
```
O sistema apresentará um menu interativo onde você poderá:
- **Cadastrar clientes**
- **Criar e visualizar reservas**
- **Gerenciar quartos**
- **Adicionar avaliações**

Caso não queira criar um novo registro, utilize os usuários base:
- **Staff:** email: `adminstaff@email.com`, senha: `adminstaff`
- **Cliente:** email: `adminclient@email.com`, senha: `adminclient`

### **2.2 Comandos Principais**
#### **Criar uma nova reserva:**
1. Escolha um quarto disponível.
2. Informe a data de check-in e check-out.
3. O sistema validará se o quarto está disponível.
4. Se disponível, a reserva será confirmada.

#### **Visualizar reservas de um cliente:**
1. Insira o ID do cliente.
2. O sistema listará todas as reservas vinculadas a esse cliente.

#### **Cancelar uma reserva:**
1. Informe o ID da reserva.
2. Se não houver avaliações vinculadas, a reserva será removida.

#### **Adicionar uma avaliação:**
1. Após o check-out, o cliente pode avaliar sua estadia.
2. A avaliação inclui uma nota e um comentário.

---
## **3. Tecnologias Utilizadas**
- **Node.js** - Backend
- **Prisma ORM** - Gerenciamento do banco de dados
- **PostgreSQL** - Banco de dados
- **Readline-Sync** - Interação via terminal
- **Argon2** - Hashing de senhas

---
## **4. Contribuição**
Se desejar contribuir com o projeto, faça um fork, crie uma branch e envie um pull request.

1. Fork este repositório
2. Crie uma branch com sua funcionalidade:
   ```sh
   git checkout -b minha-nova-feature
   ```
3. Faça suas alterações e commit:
   ```sh
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie para o repositório remoto:
   ```sh
   git push origin minha-nova-feature
   ```
5. Abra um Pull Request 🚀

---
## **5. Contato**
Para dúvidas ou sugestões, entre em contato via **email@example.com**.
