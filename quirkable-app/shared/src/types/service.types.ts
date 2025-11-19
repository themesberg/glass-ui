/**
 * Service Types for Quirkable Application
 * All types use British English spelling
 */

/**
 * The four core services offered by Quirkable
 */
export enum ServiceType {
  READY_MADE = 'READY_MADE',
  BESPOKE = 'BESPOKE',
  FILE_REPAIR = 'FILE_REPAIR',
  DESIGN = 'DESIGN',
}

/**
 * Status of a service request or order
 */
export enum OrderStatus {
  PENDING = 'PENDING',
  QUOTE_SENT = 'QUOTE_SENT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

/**
 * Print material options
 */
export enum PrintMaterial {
  PLA = 'PLA',
  ABS = 'ABS',
  PETG = 'PETG',
  TPU = 'TPU',
  NYLON = 'NYLON',
  RESIN = 'RESIN',
}

/**
 * Print quality levels
 */
export enum PrintQuality {
  STANDARD = 'STANDARD',
  HIGH = 'HIGH',
  ULTRA = 'ULTRA',
}

/**
 * Colour options for prints
 */
export interface ColourOption {
  id: string;
  name: string;
  hexCode: string;
  material: PrintMaterial;
  available: boolean;
}

/**
 * Ready-Made Model in the catalogue
 */
export interface ReadyMadeModel {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number; // in pence
  images: string[];
  materials: PrintMaterial[];
  colours: ColourOption[];
  printTime: number; // in minutes
  dimensions: {
    length: number; // in mm
    width: number; // in mm
    height: number; // in mm
  };
  weight: number; // in grams
  popularity: number;
  inStock: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Bespoke printing request
 */
export interface BespokeRequest {
  id: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  fileSize: number; // in bytes
  material: PrintMaterial | null;
  colour: string | null;
  quality: PrintQuality;
  quantity: number;
  notes: string;
  status: OrderStatus;
  quoteAmount: number | null; // in pence
  estimatedDelivery: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * File repair request
 */
export interface FileRepairRequest {
  id: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  fileSize: number; // in bytes
  issueDescription: string;
  repairType: 'FIX_ONLY' | 'FIX_AND_PRINT';
  material: PrintMaterial | null;
  colour: string | null;
  status: OrderStatus;
  quoteAmount: number | null; // in pence
  repairedFileUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Design service request
 */
export interface DesignRequest {
  id: string;
  userId: string;
  projectName: string;
  description: string;
  referenceImages: string[];
  designComplexity: 'SIMPLE' | 'MODERATE' | 'COMPLEX';
  includePrinting: boolean;
  material: PrintMaterial | null;
  colour: string | null;
  quantity: number;
  status: OrderStatus;
  quoteAmount: number | null; // in pence
  designFileUrl: string | null;
  estimatedDelivery: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Shopping cart item
 */
export interface CartItem {
  id: string;
  userId: string;
  modelId: string | null;
  serviceType: ServiceType;
  requestId: string | null; // Reference to bespoke/repair/design request
  material: PrintMaterial;
  colour: string;
  quality: PrintQuality;
  quantity: number;
  pricePerUnit: number; // in pence
  addedAt: Date;
}

/**
 * Order containing multiple items
 */
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number; // in pence
  status: OrderStatus;
  shippingAddress: Address;
  trackingNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

/**
 * Address information
 */
export interface Address {
  line1: string;
  line2: string | null;
  city: string;
  county: string;
  postcode: string;
  country: string;
}
