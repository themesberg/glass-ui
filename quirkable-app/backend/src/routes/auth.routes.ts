/**
 * Authentication routes
 */

import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

import {
  getProfile,
  login,
  loginValidation,
  register,
  registerValidation,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', registerValidation, validate, (req: Request, res: Response, next: NextFunction): void => {
  void (async (): Promise<void> => {
    try {
      await register(req, res);
    } catch (error) {
      next(error);
    }
  })();
});

/**
 * POST /api/auth/login
 * Login a user
 */
router.post('/login', loginValidation, validate, (req: Request, res: Response, next: NextFunction): void => {
  void (async (): Promise<void> => {
    try {
      await login(req, res);
    } catch (error) {
      next(error);
    }
  })();
});

/**
 * GET /api/auth/profile
 * Get current user profile
 */
router.get('/profile', (req: Request, res: Response, next: NextFunction): void => {
  void (async (): Promise<void> => {
    try {
      await authenticate(req, res, next);
    } catch (error) {
      next(error);
      return;
    }
    try {
      await getProfile(req, res);
    } catch (error) {
      next(error);
    }
  })();
});

export default router;
