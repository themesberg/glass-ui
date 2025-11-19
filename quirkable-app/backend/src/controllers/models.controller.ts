/**
 * Ready-made models controller
 */

import type { Request, Response } from 'express';
import { query } from 'express-validator';

import type { ModelSearchFilters, PaginatedResponse, ReadyMadeModel } from '@quirkable/shared';

import { prisma } from '../config/database';
import { AppError } from '../middleware/error.middleware';
import { logger } from '../utils/logger';

/**
 * Validation rules for model search
 */
export const searchValidation = [
  query('page').optional().isInt({ min: 1 }).toInt().withMessage('Page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt().withMessage('Limit 1-100'),
  query('category').optional().isString().trim(),
  query('minPrice').optional().isInt({ min: 0 }).toInt(),
  query('maxPrice').optional().isInt({ min: 0 }).toInt(),
  query('inStockOnly').optional().isBoolean().toBoolean(),
  query('sortBy')
    .optional()
    .isIn(['popularity', 'price-asc', 'price-desc', 'newest'])
    .withMessage('Invalid sort option'),
];

/**
 * Get all ready-made models with filtering and pagination
 */
export async function getModels(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query['page'] as string) || 1;
    const limit = parseInt(req.query['limit'] as string) || 20;
    const filters: ModelSearchFilters = {
      category: req.query['category'] as string | undefined,
      minPrice: req.query['minPrice'] ? parseInt(req.query['minPrice'] as string) : undefined,
      maxPrice: req.query['maxPrice'] ? parseInt(req.query['maxPrice'] as string) : undefined,
      inStockOnly: req.query['inStockOnly'] === 'true',
      sortBy: (req.query['sortBy'] as ModelSearchFilters['sortBy']) || 'popularity',
    };

    // Build where clause
    const where: Record<string, unknown> = {};

    if (filters.category) {
      where['category'] = filters.category;
    }

    if (filters.inStockOnly) {
      where['inStock'] = true;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where['price'] = {};
      if (filters.minPrice !== undefined) {
        (where['price'] as Record<string, unknown>)['gte'] = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        (where['price'] as Record<string, unknown>)['lte'] = filters.maxPrice;
      }
    }

    // Build orderBy clause
    const orderBy: Record<string, string> = {};
    switch (filters.sortBy) {
      case 'price-asc':
        orderBy['price'] = 'asc';
        break;
      case 'price-desc':
        orderBy['price'] = 'desc';
        break;
      case 'newest':
        orderBy['createdAt'] = 'desc';
        break;
      case 'popularity':
      default:
        orderBy['popularity'] = 'desc';
        break;
    }

    // Get total count
    const total = await prisma.readyMadeModel.count({ where });

    // Get paginated results
    const models = await prisma.readyMadeModel.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    const response: PaginatedResponse<ReadyMadeModel> = {
      data: models,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error('Get models error:', error);
    throw new AppError(500, 'FETCH_FAILED', 'Failed to fetch models');
  }
}

/**
 * Get a single ready-made model by ID
 */
export async function getModelById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const model = await prisma.readyMadeModel.findUnique({
      where: { id },
    });

    if (!model) {
      throw new AppError(404, 'MODEL_NOT_FOUND', 'Model not found');
    }

    res.status(200).json({ data: model });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Get model by ID error:', error);
    throw new AppError(500, 'FETCH_FAILED', 'Failed to fetch model');
  }
}

/**
 * Get all available categories
 */
export async function getCategories(_req: Request, res: Response): Promise<void> {
  try {
    const categories = await prisma.readyMadeModel.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    const categoryList = categories.map((c: { category: string }) => c.category);

    res.status(200).json({ data: categoryList });
  } catch (error) {
    logger.error('Get categories error:', error);
    throw new AppError(500, 'FETCH_FAILED', 'Failed to fetch categories');
  }
}
