import { UserRole } from '@quirkable/shared';

import { ApiClientError, authApi, modelsApi } from './api';

// Mock fetch globally
global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('authApi', () => {
    describe('register', () => {
      it('should register a new user successfully', async () => {
        const mockResponse = {
          data: {
            user: {
              id: '123',
              email: 'test@example.com',
              firstName: 'John',
              lastName: 'Doe',
              role: UserRole.CUSTOMER,
              emailVerified: false,
              createdAt: new Date(),
            },
            token: 'mock-token',
            expiresAt: new Date(),
          },
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

        const result = await authApi.register({
          email: 'test@example.com',
          password: 'TestPassword123',
          firstName: 'John',
          lastName: 'Doe',
        });

        expect(result.user.email).toBe('test@example.com');
        expect(result.token).toBe('mock-token');
      });

      it('should throw error on registration failure', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => ({
            error: {
              message: 'User already exists',
              code: 'USER_EXISTS',
            },
          }),
        });

        await expect(
          authApi.register({
            email: 'existing@example.com',
            password: 'TestPassword123',
            firstName: 'John',
            lastName: 'Doe',
          })
        ).rejects.toThrow(ApiClientError);
      });
    });

    describe('login', () => {
      it('should login successfully', async () => {
        const mockResponse = {
          data: {
            user: {
              id: '123',
              email: 'test@example.com',
              firstName: 'John',
              lastName: 'Doe',
              role: UserRole.CUSTOMER,
              emailVerified: true,
              createdAt: new Date(),
            },
            token: 'mock-token',
            expiresAt: new Date(),
          },
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

        const result = await authApi.login({
          email: 'test@example.com',
          password: 'TestPassword123',
        });

        expect(result.token).toBe('mock-token');
      });
    });
  });

  describe('modelsApi', () => {
    describe('getModels', () => {
      it('should fetch models with pagination', async () => {
        const mockResponse = {
          data: [
            {
              id: '1',
              name: 'Test Model',
              description: 'A test model',
              category: 'Toys',
              price: 1000,
              images: [],
              materials: [],
              printTime: 60,
              length: 100,
              width: 100,
              height: 100,
              weight: 50,
              popularity: 10,
              inStock: true,
              tags: [],
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          pagination: {
            page: 1,
            limit: 20,
            total: 1,
            totalPages: 1,
          },
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

        const result = await modelsApi.getModels({ page: 1, limit: 20 });

        expect(result.data).toHaveLength(1);
        expect(result.pagination.total).toBe(1);
      });

      it('should build correct query params', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [],
            pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
          }),
        });

        await modelsApi.getModels({
          page: 2,
          category: 'Toys',
          minPrice: 500,
          maxPrice: 2000,
          inStockOnly: true,
          sortBy: 'price-asc',
        });

        const call = (global.fetch as jest.Mock).mock.calls[0] as [string, RequestInit];
        const url = call[0];

        expect(url).toContain('page=2');
        expect(url).toContain('category=Toys');
        expect(url).toContain('minPrice=500');
        expect(url).toContain('maxPrice=2000');
        expect(url).toContain('inStockOnly=true');
        expect(url).toContain('sortBy=price-asc');
      });
    });

    describe('getModelById', () => {
      it('should fetch a single model', async () => {
        const mockModel = {
          id: '123',
          name: 'Test Model',
          description: 'A test model',
          category: 'Toys',
          price: 1000,
          images: [],
          materials: [],
          printTime: 60,
          length: 100,
          width: 100,
          height: 100,
          weight: 50,
          popularity: 10,
          inStock: true,
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: mockModel }),
        });

        const result = await modelsApi.getModelById('123');

        expect(result.id).toBe('123');
        expect(result.name).toBe('Test Model');
      });
    });
  });
});
