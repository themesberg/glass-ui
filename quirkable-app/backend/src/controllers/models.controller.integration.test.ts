/**
 * Integration tests for models endpoints
 */

import request from 'supertest';

import { PrintMaterial, PrintQuality } from '@quirkable/shared';

import { createApp } from '../app';
import { prisma } from '../config/database';

const app = createApp();

describe('Models Endpoints', () => {
  beforeEach(async () => {
    // Create test models
    await Promise.all([
      prisma.readyMadeModel.create({
        data: {
          name: 'Test Model 1',
          description: 'First test model',
          category: 'Test',
          price: 1000,
          images: [],
          materials: [PrintMaterial.PLA],
          printTime: 60,
          length: 100,
          width: 100,
          height: 100,
          weight: 50,
          popularity: 10,
          inStock: true,
          tags: ['test'],
        },
      }),
      prisma.readyMadeModel.create({
        data: {
          name: 'Test Model 2',
          description: 'Second test model',
          category: 'Test',
          price: 2000,
          images: [],
          materials: [PrintMaterial.ABS],
          printTime: 120,
          length: 150,
          width: 150,
          height: 150,
          weight: 100,
          popularity: 20,
          inStock: false,
          tags: ['test'],
        },
      }),
    ]);
  });

  describe('GET /api/models', () => {
    it('should get all models with pagination', async () => {
      const response = await request(app).get('/api/models');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.total).toBeGreaterThanOrEqual(2);
    });

    it('should filter by category', async () => {
      const response = await request(app).get('/api/models?category=Test');

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);
      expect(response.body.data.every((m: { category: string }) => m.category === 'Test')).toBe(
        true
      );
    });

    it('should filter by price range', async () => {
      const response = await request(app).get('/api/models?minPrice=1500&maxPrice=2500');

      expect(response.status).toBe(200);
      expect(
        response.body.data.every((m: { price: number }) => m.price >= 1500 && m.price <= 2500)
      ).toBe(true);
    });

    it('should filter by stock status', async () => {
      const response = await request(app).get('/api/models?inStockOnly=true');

      expect(response.status).toBe(200);
      expect(response.body.data.every((m: { inStock: boolean }) => m.inStock === true)).toBe(true);
    });

    it('should sort by price ascending', async () => {
      const response = await request(app).get('/api/models?sortBy=price-asc');

      expect(response.status).toBe(200);
      const prices = response.body.data.map((m: { price: number }) => m.price) as number[];
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
    });

    it('should sort by price descending', async () => {
      const response = await request(app).get('/api/models?sortBy=price-desc');

      expect(response.status).toBe(200);
      const prices = response.body.data.map((m: { price: number }) => m.price) as number[];
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sorted);
    });
  });

  describe('GET /api/models/:id', () => {
    it('should get a single model by ID', async () => {
      const model = await prisma.readyMadeModel.findFirst();
      if (!model) {
        throw new Error('No model found for test');
      }

      const response = await request(app).get(`/api/models/${model.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(model.id);
      expect(response.body.data.name).toBe(model.name);
    });

    it('should return 404 for non-existent model', async () => {
      const response = await request(app).get('/api/models/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe('MODEL_NOT_FOUND');
    });
  });

  describe('GET /api/models/categories', () => {
    it('should get all categories', async () => {
      const response = await request(app).get('/api/models/categories');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data).toContain('Test');
    });
  });
});
