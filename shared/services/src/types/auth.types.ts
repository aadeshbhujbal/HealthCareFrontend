import { z } from 'zod';

export type Role = 'SUPER_ADMIN' | 'DOCTOR' | 'PATIENT' | 'CLINIC_ADMIN' | 'RECEPTIONIST';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  redirectPath?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  name?: string; // This will be generated from firstName and lastName
  age: number;
}

export interface SocialLoginData {
  provider: 'google' | 'facebook' | 'apple';
  token: string;
}

export interface OTPRequest {
  identifier: string;
  deliveryMethod: 'email' | 'sms' | 'all';
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  age: z.number().min(1, 'Age must be at least 1').max(150, 'Age must be less than 150'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}); 