# Finance App

This repository contains a simple full-stack application with a React frontend and an Express API using PostgreSQL via Prisma.

## Folders

- **frontend** – React application built with TypeScript and Vite using Material UI.
- **api** – Express server written in TypeScript with Prisma ORM.

## Development

Each project is isolated so you can run `npm install` inside `frontend` and `api` separately. The frontend offers pages for viewing transactions, adding new ones, managing categories and handling fixed monthly expenses.

## Docker Compose

You can start the entire stack with Docker if you have `docker` and `docker-compose` installed. Run:

```bash
docker-compose up
```

The API will be available on `http://localhost:4000` and the frontend on `http://localhost:3000`.
