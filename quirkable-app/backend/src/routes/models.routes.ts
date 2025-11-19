/**
 * Ready-made models routes
 */

import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

import {
  getCategories,
  getModelById,
  getModels,
  searchValidation,
} from '../controllers/models.controller';
import { validate } from '../middleware/validation.middleware';

const router = Router();

/**
 * GET /api/models
 * Get all ready-made models with filtering
 */
router.get('/', searchValidation, validate, (req: Request, res: Response, next: NextFunction): void => {
  void (async (): Promise<void> => {
    try {
      await getModels(req, res);
    } catch (error) {
      next(error);
    }
  })();
});

/**
 * GET /api/models/categories
 * Get all available categories
 */
router.get('/categories', (req: Request, res: Response, next: NextFunction): void => {
  void (async (): Promise<void> => {
    try {
      await getCategories(req, res);
    } catch (error) {
      next(error);
    }
  })();
});

/**
 * GET /api/models/:id
 * Get a single model by ID
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  void (async (): Promise<void> => {
    try {
      await getModelById(req, res);
    } catch (error) {
      next(error);
    }
  })();
});

export default router;
