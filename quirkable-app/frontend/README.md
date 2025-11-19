# Quirkable Frontend

Next.js 14 frontend with TypeScript, Tailwind CSS, and full type safety.

## Features

- Next.js 14 with App Router
- TypeScript with strict mode
- Tailwind CSS for styling
- React Testing Library for component tests
- Authentication context with JWT
- API client with type-safe requests
- 100% test coverage

## Pages

- `/` - Homepage with service overview
- `/models` - Browse ready-made models
- `/bespoke` - Bespoke printing service
- `/repair` - File repair service
- `/design` - Design service
- `/login` - User login
- `/register` - User registration
- `/about` - About Quirkable

## Components

### Header
Navigation bar with links to all main sections.

### Footer
Site footer with service links and company information.

## Context

### AuthContext
Manages user authentication state and provides login/register/logout functions.

Usage:
```tsx
'use client';

import { useAuth } from '@/context/auth.context';

export default function MyComponent() {
  const { user, login, logout } = useAuth();

  // Use auth state and functions
}
```

## API Client

Type-safe API client in `src/lib/api.ts`.

Example usage:
```typescript
import { authApi, modelsApi } from '@/lib/api';

// Register
await authApi.register({
  email: 'user@example.com',
  password: 'Password123',
  firstName: 'John',
  lastName: 'Doe'
});

// Get models
const models = await modelsApi.getModels({
  page: 1,
  category: 'Office',
  inStockOnly: true
});
```

## Styling

Quirkable brand colours:
- `quirkable-blue`: #2D5BFF
- `quirkable-charcoal`: #1A1A1A
- `quirkable-teal`: #14B8A6
- `quirkable-purple`: #8B5CF6
- `quirkable-orange`: #F97316

Typography:
- **Sans**: Inter
- **Display**: Space Grotesk
- **Mono**: JetBrains Mono

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Visit http://localhost:3000

## Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

## Building

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Type Safety

All API responses are fully typed using shared types from `@quirkable/shared`.

TypeScript strict mode is enabled with:
- No implicit any
- Strict null checks
- Explicit function return types
- No unused locals/parameters
