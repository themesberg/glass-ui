/**
 * Request validation middleware using express-validator
 */

import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to check validation results
 */
export function validate(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: {
          errors: errors.array().map((err) => ({
            field: 'field' in err ? err.field : 'unknown',
            message: err.msg,
            value: 'value' in err ? err.value : undefined,
          })),
        },
      },
    });
    return;
  }

  next();
}
