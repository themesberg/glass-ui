/**
 * Error handling middleware
 */

import type { NextFunction, Request, Response } from 'express';

import { logger } from '../utils/logger';

/**
 * Custom application error
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handler middleware
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error('Error occurred:', err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
        details: err.details,
      },
    });
    return;
  }

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    res.status(400).json({
      error: {
        message: 'Database operation failed',
        code: 'DATABASE_ERROR',
      },
    });
    return;
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    res.status(400).json({
      error: {
        message: err.message,
        code: 'VALIDATION_ERROR',
      },
    });
    return;
  }

  // Default error response
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND',
    },
  });
}
