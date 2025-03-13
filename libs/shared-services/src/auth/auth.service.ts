import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_URL } from '../config';
;

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
  };
  redirectUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  deliveredVia?: string[];
}

interface RegistrationResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
  redirectUrl?: string;
}

class AuthService {
  private static instance: AuthService;

  private constructor() {
    // Initialize interceptors
    this.setupInterceptors();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async setupInterceptors() {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = await this.getRefreshToken();
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }
            const response = await this.refreshAccessToken(refreshToken);
            await this.storeTokens(response.accessToken, response.refreshToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            await this.logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async storeTokens(accessToken: string, refreshToken: string): Promise<void> {
    if (typeof window !== 'undefined') {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      if (process.env['NEXT_PUBLIC_PLATFORM'] === 'web') {
        document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;
        document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict`;
      }
    }
  }

  private async getRefreshToken(): Promise<string | null> {
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split(';');
      const refreshToken = cookies.find(c => c.trim().startsWith('refreshToken='));
      return refreshToken ? refreshToken.split('=')[1] : null;
    }
    return null;
  }

  public async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      await this.storeTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message || 'Failed to login. Please try again.'
      );
    }
  }

  private async refreshAccessToken(refreshToken: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/refresh', { refreshToken });
    return response.data;
  }

  public async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
      api.defaults.headers.common['Authorization'] = '';
      if (typeof window !== 'undefined') {
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        localStorage.removeItem('userRole');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  public async requestOTP(identifier: string): Promise<OTPResponse> {
    try {
      const response = await api.post<OTPResponse>('/auth/request-otp', {
        identifier,
        deliveryMethod: 'all',
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message || 'Failed to send OTP. Please try again.'
      );
    }
  }

  public async verifyOTP(email: string, otp: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/verify-otp', {
        email,
        otp,
      });
      await this.storeTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message || 'Invalid OTP. Please try again.'
      );
    }
  }

  public async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>('/auth/forgot-password', {
        email,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message || 'Failed to process request. Please try again.'
      );
    }
  }

  public async resetPassword(data: { email: string; resetCode: string; newPassword: string }): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message || 'Failed to reset password. Please try again.'
      );
    }
  }

  public async register(data: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<RegistrationResponse> {
    try {
      const response = await api.post<RegistrationResponse>('/auth/register', data);
      await this.storeTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message || 'Failed to register. Please try again.'
      );
    }
  }
}

export const authService = AuthService.getInstance();