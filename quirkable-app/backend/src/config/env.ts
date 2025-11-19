/**
 * Environment variable configuration with validation
 */

import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  corsOrigin: string;
  maxFileSizeMb: number;
  uploadDir: string;
}

/**
 * Validate and parse environment variables
 */
function validateEnv(): EnvConfig {
  const required = ['DATABASE_URL', 'JWT_SECRET'];

  for (const variable of required) {
    if (!process.env[variable]) {
      throw new Error(`Missing required environment variable: ${variable}`);
    }
  }

  return {
    port: parseInt(process.env['PORT'] ?? '3001', 10),
    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    databaseUrl: process.env['DATABASE_URL'] as string,
    jwtSecret: process.env['JWT_SECRET'] as string,
    jwtExpiresIn: process.env['JWT_EXPIRES_IN'] ?? '7d',
    corsOrigin: process.env['CORS_ORIGIN'] ?? 'http://localhost:3000',
    maxFileSizeMb: parseInt(process.env['MAX_FILE_SIZE_MB'] ?? '50', 10),
    uploadDir: process.env['UPLOAD_DIR'] ?? './uploads',
  };
}

export const env = validateEnv();
