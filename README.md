# **Sistema de Gerenciamento de Reservas**

Este aplicativo é um **sistema de gerenciamento de reservas** que permite aos usuários cadastrar clientes, realizar reservas de quartos e avaliar as estadias. Ele utiliza **Node.js** com **Prisma ORM**, banco de dados **PostgreSQL** e interage via **linha de comando**.

---

## **1. Instalação**

### **1.1 Pré-requisitos**

-   **Node.js** (v16 ou superior)
-   **Yarn**

### **1.2 Clonando o projeto e instalando dependências**

1. Clone este repositório:
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd <PASTA_DO_PROJETO>
    ```
2. Instale as dependências:
    ```sh
    yarn install
    yarn prisma generate (para carregar variaveis de ambiente)
    ```

---

## **2. Como Usar**

### **2.1 Executar o Sistema**

Para iniciar o sistema, execute:

```sh
node src/system.js
```

O sistema apresentará um menu interativo onde você poderá:

-   **Cadastrar clientes**
-   **Criar e visualizar reservas**
-   **Gerenciar quartos**
-   **Adicionar avaliações**

Caso não queira criar um novo registro, utilize os usuários base:

-   **Staff:** email: `adminstaff@email.com`, senha: `adminstaff`
-   **Cliente:** email: `adminclient@email.com`, senha: `adminclient`

### **2.2 Comandos Principais**

#### **Para a area do cliente temos diversas opcoes, uma delas é criar uma nova reserva:**

1. Escolha um quarto disponível.
2. Informe a data de check-in e check-out.
3. O sistema validará se o quarto está disponível.
4. Se disponível, a reserva será confirmada.

#### **Para area dos clientes tem a funcao Ver minhas reservas:**

1. Todas reservas feitas pelo usuario logado.
---

#### **Para area de funcionarios temos tambem diversas opcoes, uma delas sendo visualizar reservas:**

1. O sistema listará todas as reservas feitas.

#### **Para area dos clientes: Cancelar uma reserva:**

1. Informe o ID da reserva.
2. Se não houver avaliações vinculadas, a reserva será removida.

#### **Para area dos clientes: Adicionar uma avaliação:**

1. Após o check-out, o cliente pode avaliar sua estadia.
2. A avaliação inclui uma nota e um comentário.

#### **Para area dos clientes: Visualizar uma avaliação:**

1. Pode ver as avaliacoes feitas

---
#### **Para area dos clientes e funcionarios tem a funcao Ver meus dados:**

1. Retorna todos os dados cadastrados (menos as senhas)

---
#### **Para area dos clientes tem a funcao Ver quartos:**

1. Os quartos cadastrados pelo hotel
---

### **Entre outras funcionalidades...

## **3. Tecnologias Utilizadas**

-   **Node.js** - Backend
-   **Prisma ORM** - Gerenciamento do banco de dados
-   **PostgreSQL** - Banco de dados
-   **Readline-Sync** - Interação via terminal
-   **Argon2** - Hashing de senhas

---

## **4. Observações**

-   \*.env\*\* - A .env está no repositorio para mais fácil avaliação, mesmo nao sendo ideal, cuidado ao clonar repositorio talvez o nome do arquivo venha apenas "env" necessitando alteracao para ".env" .
