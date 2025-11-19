/**
 * API client for Quirkable backend
 */

import type {
  ApiError,
  ApiSuccess,
  AuthResponse,
  LoginRequest,
  PaginatedResponse,
  ReadyMadeModel,
  RegisterRequest,
} from '@quirkable/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * Make an API request with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiSuccess<T> | PaginatedResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = (await response.json()) as ApiSuccess<T> | ApiError | PaginatedResponse<T>;

  if (!response.ok) {
    const error = data as ApiError;
    throw new ApiClientError(
      response.status,
      error.error.code,
      error.error.message,
      error.error.details
    );
  }

  return data as ApiSuccess<T> | PaginatedResponse<T>;
}

/**
 * Authentication API
 */
export const authApi = {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return (response as ApiSuccess<AuthResponse>).data;
  },

  /**
   * Login a user
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return (response as ApiSuccess<AuthResponse>).data;
  },

  /**
   * Get current user profile
   */
  async getProfile(token: string): Promise<AuthResponse['user']> {
    const response = await apiRequest<AuthResponse['user']>('/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (response as ApiSuccess<AuthResponse['user']>).data;
  },
};

/**
 * Models API
 */
export const modelsApi = {
  /**
   * Get all models with filtering
   */
  async getModels(params?: {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
    sortBy?: 'popularity' | 'price-asc' | 'price-desc' | 'newest';
  }): Promise<PaginatedResponse<ReadyMadeModel>> {
    const searchParams = new URLSearchParams();

    if (params?.page !== undefined) {
      searchParams.append('page', params.page.toString());
    }
    if (params?.limit !== undefined) {
      searchParams.append('limit', params.limit.toString());
    }
    if (params?.category !== undefined) {
      searchParams.append('category', params.category);
    }
    if (params?.minPrice !== undefined) {
      searchParams.append('minPrice', params.minPrice.toString());
    }
    if (params?.maxPrice !== undefined) {
      searchParams.append('maxPrice', params.maxPrice.toString());
    }
    if (params?.inStockOnly !== undefined) {
      searchParams.append('inStockOnly', params.inStockOnly.toString());
    }
    if (params?.sortBy !== undefined) {
      searchParams.append('sortBy', params.sortBy);
    }

    const query = searchParams.toString();
    const endpoint = query.length > 0 ? `/api/models?${query}` : '/api/models';

    return (await apiRequest<ReadyMadeModel>(endpoint)) as PaginatedResponse<ReadyMadeModel>;
  },

  /**
   * Get a single model by ID
   */
  async getModelById(id: string): Promise<ReadyMadeModel> {
    const response = await apiRequest<ReadyMadeModel>(`/api/models/${id}`);
    return (response as ApiSuccess<ReadyMadeModel>).data;
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<string[]> {
    const response = await apiRequest<string[]>('/api/models/categories');
    return (response as ApiSuccess<string[]>).data;
  },
};
