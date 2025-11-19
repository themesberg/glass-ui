/**
 * Authentication utilities for JWT and password hashing
 */

import bcrypt from 'bcrypt';
import type { SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import type { PublicUser, User } from '@quirkable/shared';

import { env } from '../config/env';

const SALT_ROUNDS = 12;

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(userId: string): string {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn,
  };
  return jwt.sign({ userId }, env.jwtSecret, options);
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): { userId: string } {
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { userId: string };
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

/**
 * Convert User to PublicUser (remove sensitive fields)
 */
export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  };
}
