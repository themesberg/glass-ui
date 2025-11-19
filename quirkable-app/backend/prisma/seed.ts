/**
 * Prisma database seed script
 * Populates the database with sample data for development
 */

import {
  DesignComplexity,
  OrderStatus,
  PrintMaterial,
  PrintQuality,
  PrismaClient,
  ServiceType,
  UserRole,
} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Starting database seed...');

  // Create test users
  const passwordHash = await bcrypt.hash('TestPassword123', 12);

  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@quirkable.test',
      passwordHash,
      firstName: 'Test',
      lastName: 'Customer',
      role: UserRole.CUSTOMER,
      phoneNumber: '07123456789',
      emailVerified: true,
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@quirkable.test',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });

  console.log('Created users:', { customerUser: customerUser.email, adminUser: adminUser.email });

  // Create colour options
  const colours = await Promise.all([
    prisma.colourOption.create({
      data: { name: 'Black', hexCode: '#000000', material: PrintMaterial.PLA },
    }),
    prisma.colourOption.create({
      data: { name: 'White', hexCode: '#FFFFFF', material: PrintMaterial.PLA },
    }),
    prisma.colourOption.create({
      data: { name: 'Red', hexCode: '#FF0000', material: PrintMaterial.PLA },
    }),
    prisma.colourOption.create({
      data: { name: 'Blue', hexCode: '#0000FF', material: PrintMaterial.PLA },
    }),
    prisma.colourOption.create({
      data: { name: 'Green', hexCode: '#00FF00', material: PrintMaterial.PLA },
    }),
  ]);

  console.log(`Created ${colours.length} colour options`);

  // Create ready-made models
  const models = await Promise.all([
    prisma.readyMadeModel.create({
      data: {
        name: 'Desktop Organiser',
        description:
          'Keep your desk tidy with this practical multi-compartment organiser. Perfect for pens, paperclips, and small accessories.',
        category: 'Office',
        price: 1200, // £12.00
        images: ['/models/organiser-1.jpg', '/models/organiser-2.jpg'],
        materials: [PrintMaterial.PLA, PrintMaterial.PETG],
        printTime: 180,
        length: 150,
        width: 100,
        height: 50,
        weight: 80,
        popularity: 95,
        inStock: true,
        tags: ['office', 'organisation', 'desk', 'practical'],
      },
    }),
    prisma.readyMadeModel.create({
      data: {
        name: 'Phone Stand',
        description:
          'Adjustable phone stand with non-slip base. Compatible with all smartphone sizes.',
        category: 'Tech',
        price: 800, // £8.00
        images: ['/models/phone-stand-1.jpg'],
        materials: [PrintMaterial.PLA],
        printTime: 90,
        length: 80,
        width: 70,
        height: 60,
        weight: 45,
        popularity: 88,
        inStock: true,
        tags: ['phone', 'tech', 'accessories', 'stand'],
      },
    }),
    prisma.readyMadeModel.create({
      data: {
        name: 'Cable Management Clips',
        description: 'Set of 10 cable clips to keep your cables organised and tangle-free.',
        category: 'Office',
        price: 600, // £6.00
        images: ['/models/cable-clips-1.jpg'],
        materials: [PrintMaterial.PLA, PrintMaterial.TPU],
        printTime: 45,
        length: 30,
        width: 20,
        height: 15,
        weight: 20,
        popularity: 92,
        inStock: true,
        tags: ['cables', 'organisation', 'office', 'tech'],
      },
    }),
    prisma.readyMadeModel.create({
      data: {
        name: 'Plant Pot - Modern Geometric',
        description:
          'Modern geometric plant pot with drainage. Perfect for succulents and small plants.',
        category: 'Home & Garden',
        price: 1500, // £15.00
        images: ['/models/plant-pot-1.jpg', '/models/plant-pot-2.jpg'],
        materials: [PrintMaterial.PLA, PrintMaterial.PETG],
        printTime: 240,
        length: 100,
        width: 100,
        height: 120,
        weight: 150,
        popularity: 78,
        inStock: true,
        tags: ['garden', 'plants', 'decoration', 'home'],
      },
    }),
    prisma.readyMadeModel.create({
      data: {
        name: 'Miniature Chess Set',
        description:
          'Complete chess set with detailed pieces. Board not included. Perfect for travel or display.',
        category: 'Games & Toys',
        price: 2500, // £25.00
        images: ['/models/chess-1.jpg'],
        materials: [PrintMaterial.RESIN],
        printTime: 480,
        length: 150,
        width: 150,
        height: 50,
        weight: 200,
        popularity: 85,
        inStock: true,
        tags: ['games', 'chess', 'toys', 'collectibles'],
      },
    }),
  ]);

  console.log(`Created ${models.length} ready-made models`);

  // Create sample bespoke request
  await prisma.bespokeRequest.create({
    data: {
      userId: customerUser.id,
      fileUrl: '/uploads/sample-model.stl',
      fileName: 'custom-part.stl',
      fileSize: 1024000,
      material: PrintMaterial.ABS,
      colour: 'Black',
      quality: PrintQuality.HIGH,
      quantity: 2,
      notes: 'Please ensure high strength for functional use',
      status: OrderStatus.QUOTE_SENT,
      quoteAmount: 3500,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  // Create sample file repair request
  await prisma.fileRepairRequest.create({
    data: {
      userId: customerUser.id,
      fileUrl: '/uploads/broken-model.stl',
      fileName: 'broken-model.stl',
      fileSize: 2048000,
      issueDescription: 'File has holes and non-manifold edges',
      repairType: 'FIX_AND_PRINT',
      material: PrintMaterial.PLA,
      colour: 'White',
      status: OrderStatus.IN_PROGRESS,
      quoteAmount: 1800,
    },
  });

  // Create sample design request
  await prisma.designRequest.create({
    data: {
      userId: customerUser.id,
      projectName: 'Custom Logo Badge',
      description: 'Need a 3D version of company logo for display purposes',
      referenceImages: ['/uploads/logo-ref.jpg'],
      designComplexity: DesignComplexity.MODERATE,
      includePrinting: true,
      material: PrintMaterial.PETG,
      colour: 'Blue',
      quantity: 5,
      status: OrderStatus.PENDING,
    },
  });

  // Create sample cart items
  await prisma.cartItem.create({
    data: {
      userId: customerUser.id,
      modelId: models[0]?.id,
      serviceType: ServiceType.READY_MADE,
      material: PrintMaterial.PLA,
      colour: 'Black',
      quality: PrintQuality.STANDARD,
      quantity: 1,
      pricePerUnit: models[0]?.price ?? 0,
    },
  });

  console.log('Database seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
