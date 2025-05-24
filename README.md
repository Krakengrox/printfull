# Project Title (Replace Me)

Backend service for Project Title.

## Prerequisites

- Node.js (v18+ recommended)
- npm
- Docker & Docker Compose

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <project-directory>
    ```

2.  **Create .env file:**
    Copy `.env.example` to `.env` (if an example is provided) or create `.env` manually with the following content:
    ```env
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/printfull?schema=public"
    # Add other environment variables like PORT if needed
    # PORT=3000 
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start PostgreSQL database with Docker:**
    ```bash
    docker-compose up -d
    ```

5.  **Run Prisma migrations to create database tables:**
    ```bash
    npm run prisma:migrate
    ```
    (You might be prompted to name the migration, e.g., "init_user_table")

6.  **Generate Prisma Client:**
    ```bash
    npm run prisma:generate
    ```

7.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server should be running at `http://localhost:3000` (or your configured PORT).
    You can check the health endpoint at `http://localhost:3000/health`.

## Available Scripts

-   `npm run dev`: Starts the development server with Nodemon and ts-node.
-   `npm run build`: Compiles TypeScript to JavaScript (output to `dist/` directory).
-   `npm run start`: Starts the production server (requires prior `npm run build`).
-   `npm run test`: Runs tests using Jest.
-   `npm run prisma:generate`: Generates Prisma Client.
-   `npm run prisma:migrate`: Applies database migrations.
-   `npm run prisma:studio`: Opens Prisma Studio to view/manage data.

## Project Structure

```
.
├── src/
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Custom middlewares
│   ├── prisma/         # Prisma schema and client
│   │   ├── client.ts
│   │   └── schema.prisma
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── server.ts       # Express server setup
├── tests/              # Test files
├── .env                # Environment variables (ignored by Git)
├── .gitignore          # Specifies intentionally untracked files that Git should ignore
├── docker-compose.yml  # Docker Compose configuration for services (e.g., database)
├── package.json        # Project metadata and dependencies
├── tsconfig.json       # TypeScript compiler options
└── README.md           # This file
```

## Prisma

-   Schema: `src/prisma/schema.prisma`
-   Client: `src/prisma/client.ts` (re-exported), generated to `src/generated/prisma`

Remember to run `npm run prisma:generate` after any changes to `schema.prisma`. 