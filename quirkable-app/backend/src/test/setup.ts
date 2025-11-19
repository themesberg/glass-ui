/**
 * Jest test setup
 */

import { prisma } from '../config/database';

// Set test environment
process.env['NODE_ENV'] = 'test';
process.env['JWT_SECRET'] = 'test-secret-key';
process.env['DATABASE_URL'] = 'postgresql://test:test@localhost:5432/quirkable_test';

/**
 * Clean up database after each test
 */
afterEach(async () => {
  // Clean up all tables in reverse order of dependencies
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.designRequest.deleteMany();
  await prisma.fileRepairRequest.deleteMany();
  await prisma.bespokeRequest.deleteMany();
  await prisma.readyMadeModel.deleteMany();
  await prisma.colourOption.deleteMany();
  await prisma.user.deleteMany();
});

/**
 * Close database connection after all tests
 */
afterAll(async () => {
  await prisma.$disconnect();
});
