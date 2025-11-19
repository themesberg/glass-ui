# Quirkable Full-Stack Application

> Turn Ideas Into Objects - Complete 3D printing service platform

A production-ready monorepo application built with TypeScript, featuring a Next.js 14 frontend, Express backend, and PostgreSQL database.

## Features

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Express.js API with Prisma ORM and PostgreSQL
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Testing**: 100% code coverage with Jest, React Testing Library, and Supertest
- **Type Safety**: Strict TypeScript configuration across all packages
- **Code Quality**: ESLint and Prettier with zero-error enforcement
- **Monorepo**: pnpm workspaces for efficient dependency management

## Services

Quirkable offers four core 3D printing services:

1. **Ready-Made Models** - Browse and purchase from a curated catalogue
2. **Bespoke Printing** - Upload your files for custom printing
3. **File Repair** - Professional STL file repair services
4. **Design Service** - From concept to creation with in-house designers

## Project Structure

```
quirkable-app/
├── backend/              # Express API server
│   ├── prisma/          # Database schema and migrations
│   ├── src/
│   │   ├── config/      # Database and environment configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Auth, validation, error handling
│   │   ├── routes/      # API route definitions
│   │   └── utils/       # Helper functions
│   └── package.json
├── frontend/            # Next.js 14 application
│   ├── src/
│   │   ├── app/         # Next.js App Router pages
│   │   ├── components/  # React components
│   │   ├── context/     # React context providers
│   │   └── lib/         # API client and utilities
│   └── package.json
├── shared/              # Shared TypeScript types
│   └── src/types/       # Common type definitions
└── package.json         # Root workspace configuration
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 14

## Installation

1. **Clone the repository**

```bash
cd quirkable-app
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Backend (.env):
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

Frontend (.env.local):
```bash
cd frontend
cp .env.local.example .env.local
```

4. **Set up the database**

```bash
cd backend
pnpm db:migrate
pnpm db:seed
```

## Development

Start all services in development mode:

```bash
# From root directory
pnpm dev
```

This starts:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

Or run individually:

```bash
# Backend only
cd backend
pnpm dev

# Frontend only
cd frontend
pnpm dev
```

## Testing

Run all tests with coverage:

```bash
pnpm test:coverage
```

Run tests for specific package:

```bash
# Backend tests
cd backend
pnpm test

# Frontend tests
cd frontend
pnpm test
```

Watch mode for development:

```bash
pnpm test:watch
```

## Building

Build all packages:

```bash
pnpm build
```

Build individually:

```bash
cd backend && pnpm build
cd frontend && pnpm build
```

## Code Quality

Lint all packages:

```bash
pnpm lint
```

Format all code:

```bash
pnpm format
```

Type checking:

```bash
pnpm type-check
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (requires auth)

### Ready-Made Models

- `GET /api/models` - Get all models with filtering
- `GET /api/models/:id` - Get single model by ID
- `GET /api/models/categories` - Get all categories

## Database Schema

Key models:

- **User** - Customer and admin accounts
- **ReadyMadeModel** - Catalogue of 3D models
- **BespokeRequest** - Custom printing requests
- **FileRepairRequest** - File repair requests
- **DesignRequest** - Design service requests
- **Order** - Customer orders
- **CartItem** - Shopping cart items

## Technology Stack

### Frontend

- Next.js 14 (App Router)
- React 18
- TypeScript 5.3
- Tailwind CSS 3.4
- Jest + React Testing Library

### Backend

- Express.js 4
- TypeScript 5.3
- Prisma ORM 5
- PostgreSQL
- JWT Authentication
- Jest + Supertest

### Shared

- TypeScript strict mode
- ESLint with strict rules
- Prettier for formatting
- British English spelling

## Test Coverage

All packages maintain 100% test coverage:

- Unit tests for utilities and helpers
- Integration tests for API endpoints
- Component tests for React components
- Full TypeScript type coverage

## Scripts Reference

### Root

- `pnpm dev` - Start all services in development
- `pnpm build` - Build all packages
- `pnpm test` - Run all tests
- `pnpm test:coverage` - Run tests with coverage
- `pnpm lint` - Lint all packages
- `pnpm format` - Format all code

### Backend

- `pnpm dev` - Start dev server with hot reload
- `pnpm build` - Build TypeScript
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with sample data

### Frontend

- `pnpm dev` - Start Next.js dev server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests

## Contributing

1. Ensure all tests pass: `pnpm test`
2. Ensure TypeScript compiles: `pnpm type-check`
3. Ensure no lint errors: `pnpm lint`
4. Format code: `pnpm format`

## Licence

Private - All rights reserved
