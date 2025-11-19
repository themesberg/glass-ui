/**
 * Authentication middleware
 */

import type { NextFunction, Request, Response } from 'express';

import { UserRole } from '@quirkable/shared';

import { prisma } from '../config/database';
import { verifyToken } from '../utils/auth';
import { logger } from '../utils/logger';

/**
 * Extended Request with user information
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

/**
 * Middleware to authenticate requests using JWT
 */
export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: {
          message: 'Authentication required',
          code: 'UNAUTHORIZED',
        },
      });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      res.status(401).json({
        error: {
          message: 'User not found',
          code: 'UNAUTHORIZED',
        },
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({
      error: {
        message: 'Invalid or expired token',
        code: 'UNAUTHORIZED',
      },
    });
  }
}

/**
 * Middleware to check if user has admin role
 */
export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user || req.user.role !== UserRole.ADMIN) {
    res.status(403).json({
      error: {
        message: 'Admin access required',
        code: 'FORBIDDEN',
      },
    });
    return;
  }

  next();
}
