# Quirkable Backend API

Express.js API with TypeScript, Prisma, and PostgreSQL.

## Features

- RESTful API with Express.js
- Prisma ORM with PostgreSQL
- JWT authentication with bcrypt
- Request validation with express-validator
- Comprehensive error handling
- Winston logging
- 100% test coverage with Jest and Supertest

## API Endpoints

### Authentication

**POST /api/auth/register**
Register a new user account.

Request:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "07123456789"
}
```

Response:
```json
{
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER",
      "emailVerified": false,
      "createdAt": "..."
    },
    "token": "jwt-token-here",
    "expiresAt": "..."
  }
}
```

**POST /api/auth/login**
Login with email and password.

**GET /api/auth/profile**
Get current user profile (requires Bearer token).

### Ready-Made Models

**GET /api/models**
Get all models with optional filtering and pagination.

Query parameters:
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `category` (string): Filter by category
- `minPrice` (number): Minimum price in pence
- `maxPrice` (number): Maximum price in pence
- `inStockOnly` (boolean): Only show in-stock items
- `sortBy` (string): Sort order (popularity, price-asc, price-desc, newest)

**GET /api/models/:id**
Get a single model by ID.

**GET /api/models/categories**
Get all available categories.

## Database Schema

See `prisma/schema.prisma` for complete schema.

Key models:
- User - Customer and admin accounts
- ReadyMadeModel - 3D model catalogue
- BespokeRequest - Custom printing requests
- FileRepairRequest - File repair requests
- DesignRequest - Design service requests
- Order - Customer orders

## Environment Variables

Required variables in `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quirkable"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
MAX_FILE_SIZE_MB=50
UPLOAD_DIR="./uploads"
```

## Development

```bash
# Install dependencies
pnpm install

# Run migrations
pnpm db:migrate

# Seed database
pnpm db:seed

# Start dev server
pnpm dev
```

## Testing

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

## Production

```bash
# Build
pnpm build

# Start
pnpm start
```

## Error Handling

All errors follow this format:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

Common error codes:
- `VALIDATION_ERROR` - Request validation failed
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `USER_EXISTS` - Email already registered
- `INVALID_CREDENTIALS` - Wrong email/password
