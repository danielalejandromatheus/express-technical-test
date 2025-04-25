# Testing of Employees Backend

This is the backend service for the Testing of Employees application. It's built using Node.js, Express, TypeScript, Mongoose, and Zod for request validation.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Running the Project in Development

```bash
npm run dev
```

### Seeding the database for a root user and manager

```bash
npm run seed:users
```

## Project Structure

```
src/
├── controllers/       # Route handlers
├── services/          # Business logic
├── models/            # Mongoose models and schemas
├── middlewares/       # Express middlewares
├── routes/            # API route declarations
├── utils/             # Utility functions
   ├── exceptions      # Basic exception handling for outputting errors
├── entities/          # Zod schemas for validation
├── config/            # Environment configs
└── index.ts           # Entry point
seeders/               # Seeds for initial setup
```

## Environment Variables

Create a `.env` file in the root based on the .env.example file

## Documentation

You can find a brief postman collection in the file "Test.postman_collection"

## Features

- **Employee Listing**: View all employees and their pending evaluations.
- **Evaluations**: Assign multiple-choice tests and auto-score answers.
- **Reports**: Generate reports by employee or department, including scores.
- **Search & Filter**: Paginate and filter by dynamic fields.
