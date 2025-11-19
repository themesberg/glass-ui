/**
 * Integration tests for authentication endpoints
 */

import request from 'supertest';

import { UserRole } from '@quirkable/shared';

import { createApp } from '../app';
import { prisma } from '../config/database';
import { hashPassword } from '../utils/auth';

const app = createApp();

describe('Authentication Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const response = await request(app).post('/api/auth/register').send({
        email: 'newuser@example.com',
        password: 'ValidPassword123',
        firstName: 'New',
        lastName: 'User',
      });

      expect(response.status).toBe(201);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.user.email).toBe('newuser@example.com');
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user.role).toBe(UserRole.CUSTOMER);
    });

    it('should reject registration with existing email', async () => {
      await prisma.user.create({
        data: {
          email: 'existing@example.com',
          passwordHash: await hashPassword('password'),
          firstName: 'Existing',
          lastName: 'User',
          role: UserRole.CUSTOMER,
        },
      });

      const response = await request(app).post('/api/auth/register').send({
        email: 'existing@example.com',
        password: 'ValidPassword123',
        firstName: 'New',
        lastName: 'User',
      });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('USER_EXISTS');
    });

    it('should reject invalid email', async () => {
      const response = await request(app).post('/api/auth/register').send({
        email: 'invalid-email',
        password: 'ValidPassword123',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should reject weak password', async () => {
      const response = await request(app).post('/api/auth/register').send({
        email: 'test@example.com',
        password: 'weak',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await prisma.user.create({
        data: {
          email: 'logintest@example.com',
          passwordHash: await hashPassword('TestPassword123'),
          firstName: 'Login',
          lastName: 'Test',
          role: UserRole.CUSTOMER,
        },
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'logintest@example.com',
        password: 'TestPassword123',
      });

      expect(response.status).toBe(200);
      expect(response.body.data.user.email).toBe('logintest@example.com');
      expect(response.body.data.token).toBeDefined();
    });

    it('should reject wrong password', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'logintest@example.com',
        password: 'WrongPassword123',
      });

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    });

    it('should reject non-existent user', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'TestPassword123',
      });

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    });
  });

  describe('GET /api/auth/profile', () => {
    let authToken: string;

    beforeEach(async () => {
      const response = await request(app).post('/api/auth/register').send({
        email: 'profiletest@example.com',
        password: 'TestPassword123',
        firstName: 'Profile',
        lastName: 'Test',
      });

      authToken = response.body.data.token as string;
    });

    it('should get profile with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.email).toBe('profiletest@example.com');
      expect('passwordHash' in response.body.data).toBe(false);
    });

    it('should reject request without token', async () => {
      const response = await request(app).get('/api/auth/profile');

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });
  });
});
