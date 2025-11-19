/**
 * API Types for Quirkable Application
 * All types use British English spelling
 */

/**
 * Standard API error response
 */
export interface ApiError {
  error: {
    message: string;
    code: string;
    details?: Record<string, unknown>;
  };
}

/**
 * Standard API success response
 */
export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
}

/**
 * Quote request parameters
 */
export interface QuoteParams {
  serviceType: string;
  fileSize?: number;
  complexity?: string;
  quantity: number;
  material?: string;
  quality?: string;
}

/**
 * Quote response
 */
export interface QuoteResponse {
  estimatedPrice: number; // in pence
  estimatedDelivery: Date;
  breakdown: {
    basePrice: number;
    materialCost: number;
    complexityFee: number;
    quantityDiscount: number;
  };
}

/**
 * Search filters for ready-made models
 */
export interface ModelSearchFilters {
  category?: string;
  materials?: string[];
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  inStockOnly?: boolean;
  sortBy?: 'popularity' | 'price-asc' | 'price-desc' | 'newest';
}

/**
 * Validation error detail
 */
export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

/**
 * Validation error response
 */
export interface ValidationErrorResponse extends ApiError {
  error: {
    message: string;
    code: 'VALIDATION_ERROR';
    details: {
      errors: ValidationError[];
    };
  };
}
