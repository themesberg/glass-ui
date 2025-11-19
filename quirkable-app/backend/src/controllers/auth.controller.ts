/**
 * Authentication controller
 */

import type { Request, Response } from 'express';
import { body } from 'express-validator';

import type { AuthResponse, LoginRequest, RegisterRequest } from '@quirkable/shared';
import { UserRole } from '@quirkable/shared';

import { prisma } from '../config/database';
import type { AuthenticatedRequest } from '../middleware/auth.middleware';
import { AppError } from '../middleware/error.middleware';
import { comparePassword, generateToken, hashPassword, toPublicUser } from '../utils/auth';
import { logger } from '../utils/logger';

/**
 * Validation rules for registration
 */
export const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('phoneNumber').optional().isMobilePhone('en-GB').withMessage('Valid UK phone number'),
];

/**
 * Validation rules for login
 */
export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

/**
 * Register a new user
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body as RegisterRequest;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError(400, 'USER_EXISTS', 'User with this email already exists');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        phoneNumber: phoneNumber ?? null,
        role: UserRole.CUSTOMER,
      },
    });

    // Generate token
    const token = generateToken(user.id);

    // Calculate expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const response: AuthResponse = {
      user: toPublicUser(user),
      token,
      expiresAt,
    };

    logger.info(`User registered: ${user.email}`);
    res.status(201).json({ data: response });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Registration error:', error);
    throw new AppError(500, 'REGISTRATION_FAILED', 'Failed to register user');
  }
}

/**
 * Login a user
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as LoginRequest;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.passwordHash);

    if (!isValidPassword) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    // Generate token
    const token = generateToken(user.id);

    // Calculate expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const response: AuthResponse = {
      user: toPublicUser(user),
      token,
      expiresAt,
    };

    logger.info(`User logged in: ${user.email}`);
    res.status(200).json({ data: response });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Login error:', error);
    throw new AppError(500, 'LOGIN_FAILED', 'Failed to login');
  }
}

/**
 * Get current user profile
 */
export async function getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      throw new AppError(401, 'UNAUTHORIZED', 'Authentication required');
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
    }

    res.status(200).json({ data: toPublicUser(user) });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Get profile error:', error);
    throw new AppError(500, 'PROFILE_FETCH_FAILED', 'Failed to fetch profile');
  }
}
