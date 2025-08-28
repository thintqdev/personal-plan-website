import { 
  API_URL, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  ForgotPasswordRequest, 
  ResetPasswordRequest, 
  ChangePasswordRequest,
  ResendVerificationRequest,
  User
} from './types';

class AuthService {
  private baseURL = `${API_URL}/api/auth`;
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && !this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        message: `HTTP error! status: ${response.status}` 
      }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await this.handleResponse<AuthResponse>(response);
    
    if (result.success && result.token) {
      this.setToken(result.token);
    }

    return result;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await this.handleResponse<AuthResponse>(response);
    
    if (result.success && result.token) {
      this.setToken(result.token);
    }

    return result;
  }

  logout() {
    this.removeToken();
  }

  async verifyEmail(token: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/verify-email/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return this.handleResponse<AuthResponse>(response);
  }

  async resendVerification(data: ResendVerificationRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/resend-verification`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<AuthResponse>(response);
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/forgot-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<AuthResponse>(response);
  }

  async resetPassword(token: string, data: ResetPasswordRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return this.handleResponse<AuthResponse>(response);
  }

  async changePassword(data: ChangePasswordRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/change-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<AuthResponse>(response);
  }

  async getProfile(): Promise<{ success: boolean; user: User }> {
    const response = await fetch(`${this.baseURL}/profile`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<{ success: boolean; user: User }>(response);
  }

  async updateProfile(data: Partial<User>): Promise<{ success: boolean; message: string; user: User }> {
    const response = await fetch(`${this.baseURL}/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<{ success: boolean; message: string; user: User }>(response);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      this.removeToken();
      return null;
    }
  }
}

export const authService = new AuthService();
export default authService;