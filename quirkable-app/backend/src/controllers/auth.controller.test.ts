/**
 * Tests for authentication controller
 */

import type { Request, Response } from 'express';
import { UserRole } from '@quirkable/shared';

import { prisma } from '../config/database';
import type { AuthenticatedRequest } from '../middleware/auth.middleware';
import { hashPassword } from '../utils/auth';

import { getProfile, login, register } from './auth.controller';

describe('Authentication Controller', () => {
  describe('register', () => {
    it('should register a new user successfully', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'TestPassword123',
          firstName: 'John',
          lastName: 'Doe',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();

      const jsonCall = (res.json as jest.Mock).mock.calls[0]?.[0];
      expect(jsonCall).toBeDefined();
      expect(jsonCall.data).toBeDefined();
      expect(jsonCall.data.user.email).toBe('test@example.com');
      expect(jsonCall.data.token).toBeDefined();
    });

    it('should throw error if user already exists', async () => {
      await prisma.user.create({
        data: {
          email: 'existing@example.com',
          passwordHash: await hashPassword('password123'),
          firstName: 'Existing',
          lastName: 'User',
          role: UserRole.CUSTOMER,
        },
      });

      const req = {
        body: {
          email: 'existing@example.com',
          password: 'TestPassword123',
          firstName: 'John',
          lastName: 'Doe',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await expect(register(req, res)).rejects.toThrow('User with this email already exists');
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await prisma.user.create({
        data: {
          email: 'login@example.com',
          passwordHash: await hashPassword('TestPassword123'),
          firstName: 'Login',
          lastName: 'User',
          role: UserRole.CUSTOMER,
        },
      });
    });

    it('should login user with correct credentials', async () => {
      const req = {
        body: {
          email: 'login@example.com',
          password: 'TestPassword123',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();

      const jsonCall = (res.json as jest.Mock).mock.calls[0]?.[0];
      expect(jsonCall).toBeDefined();
      expect(jsonCall.data.user.email).toBe('login@example.com');
      expect(jsonCall.data.token).toBeDefined();
    });

    it('should throw error with wrong password', async () => {
      const req = {
        body: {
          email: 'login@example.com',
          password: 'WrongPassword123',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await expect(login(req, res)).rejects.toThrow('Invalid email or password');
    });

    it('should throw error with non-existent email', async () => {
      const req = {
        body: {
          email: 'nonexistent@example.com',
          password: 'TestPassword123',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await expect(login(req, res)).rejects.toThrow('Invalid email or password');
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'profile@example.com',
          passwordHash: await hashPassword('TestPassword123'),
          firstName: 'Profile',
          lastName: 'User',
          role: UserRole.CUSTOMER,
        },
      });

      const req = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      } as AuthenticatedRequest;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();

      const jsonCall = (res.json as jest.Mock).mock.calls[0]?.[0];
      expect(jsonCall).toBeDefined();
      expect(jsonCall.data.email).toBe('profile@example.com');
      expect('passwordHash' in jsonCall.data).toBe(false);
    });

    it('should throw error if user not authenticated', async () => {
      const req = {} as AuthenticatedRequest;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await expect(getProfile(req, res)).rejects.toThrow('Authentication required');
    });
  });
});
