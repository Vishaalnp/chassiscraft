/**
 * API Service Layer - Abstraction for backend REST API calls.
 * Seamlessly connects frontend to the Express backend (PORT 5001).
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
  token?: string;
  user?: any;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('bodycraft_jwt_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Network error connecting to Bodycraft server.',
    };
  }
}

// Typed API Client Helpers
export const api = {
  health: () => apiRequest<{ status: string; platform: string }>('/health'),
  
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData: any) =>
      apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    getMe: () => apiRequest('/auth/me'),
  },

  workshops: {
    getAll: (params?: Record<string, string>) => {
      const query = params ? `?${new URLSearchParams(params).toString()}` : '';
      return apiRequest(`/workshops${query}`);
    },
    getById: (id: string) => apiRequest(`/workshops/${id}`),
    compare: (ids: string[]) =>
      apiRequest('/workshops/compare', { method: 'POST', body: JSON.stringify({ ids }) }),
    verifyKYC: (id: string, status: 'verified' | 'rejected') =>
      apiRequest(`/workshops/${id}/verify`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  },

  quotations: {
    createRFQ: (rfqData: any) =>
      apiRequest('/quotations/rfq', { method: 'POST', body: JSON.stringify(rfqData) }),
    getAll: () => apiRequest('/quotations'),
    accept: (quotationId: string) =>
      apiRequest(`/quotations/${quotationId}/accept`, { method: 'POST' }),
  },

  projects: {
    getAll: () => apiRequest('/projects'),
    getById: (id: string) => apiRequest(`/projects/${id}`),
    updateStage: (projectId: string, stageNumber: number, data: any) =>
      apiRequest(`/projects/${projectId}/stages/${stageNumber}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },

  reviews: {
    getByWorkshop: (workshopId: string) => apiRequest(`/reviews/workshop/${workshopId}`),
    add: (reviewData: any) =>
      apiRequest('/reviews', { method: 'POST', body: JSON.stringify(reviewData) }),
    reply: (reviewId: string, reply: string) =>
      apiRequest(`/reviews/${reviewId}/reply`, { method: 'PATCH', body: JSON.stringify({ reply }) }),
  },
};
