import { render, screen, waitFor } from '@testing-library/react';
import { UserRole } from '@quirkable/shared';

import { authApi } from '@/lib/api';

import { AuthProvider, useAuth } from './auth.context';

// Mock the API
jest.mock('@/lib/api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    getProfile: jest.fn(),
  },
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value;
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test component that uses the auth context
function TestComponent(): JSX.Element {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div data-testid="user">{user ? user.email : 'Not logged in'}</div>
      <div data-testid="token">{token ?? 'No token'}</div>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('should provide auth context', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Not logged in');
    });
  });

  it('should load user from localStorage on mount', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: UserRole.CUSTOMER,
      emailVerified: true,
      createdAt: new Date(),
    };

    localStorageMock.setItem('auth_token', 'mock-token');
    (authApi.getProfile as jest.Mock).mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
      expect(screen.getByTestId('token')).toHaveTextContent('mock-token');
    });
  });

  it('should throw error when useAuth is used outside provider', () => {
    // Suppress console.error for this test
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {
      // Mock implementation
    });

    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within AuthProvider');

    consoleError.mockRestore();
  });
});
