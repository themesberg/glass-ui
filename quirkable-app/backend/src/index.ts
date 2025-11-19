/**
 * Quirkable Backend API Entry Point
 */

import { createApp } from './app';
import { connectDatabase, disconnectDatabase } from './config/database';
import { env } from './config/env';
import { logger } from './utils/logger';

/**
 * Start the server
 */
async function startServer(): Promise<void> {
  try {
    // Connect to database
    await connectDatabase();

    // Create Express app
    const app = createApp();

    // Start server
    const server = app.listen(env.port, () => {
      logger.info(`Quirkable API server running on port ${env.port}`);
      logger.info(`Environment: ${env.nodeEnv}`);
    });

    // Graceful shutdown
    const shutdown = async (): Promise<void> => {
      logger.info('Shutting down server...');
      server.close(() => {
        logger.info('Server closed');
      });
      await disconnectDatabase();
      process.exit(0);
    };

    process.on('SIGTERM', () => {
      void shutdown();
    });
    process.on('SIGINT', () => {
      void shutdown();
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
void startServer();
