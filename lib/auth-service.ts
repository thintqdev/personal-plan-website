const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

interface LoginResponse {
    token: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        status: string;
        avatar?: string;
    };
    message: string;
}

interface ApiResponse<T = any> {
    message?: string;
    error?: string;
    data?: T;
}

class AuthService {
    private getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        };
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Đăng nhập thất bại');
        }

        return data;
    }

    async register(name: string, email: string, password: string): Promise<ApiResponse> {
        const response = await fetch(`${API_BASE}/api/auth/register`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Đăng ký thất bại');
        }

        return data;
    }

    async getCurrentUser() {
        const response = await fetch(`${API_BASE}/api/auth/me`, {
            headers: this.getHeaders(),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Không thể lấy thông tin người dùng');
        }

        // API returns user object directly
        return data;
    }

    async forgotPassword(email: string): Promise<ApiResponse> {
        const response = await fetch(`${API_BASE}/api/auth/forgot-password`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Gửi email thất bại');
        }

        return data;
    }

    async resetPassword(token: string, password: string): Promise<ApiResponse> {
        const response = await fetch(`${API_BASE}/api/auth/reset-password`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ token, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Đặt lại mật khẩu thất bại');
        }

        return data;
    }

    async verifyEmail(token: string): Promise<ApiResponse> {
        const response = await fetch(`${API_BASE}/api/auth/verify-email/${token}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Xác thực email thất bại');
        }

        return data;
    }

    async resendVerificationEmail(email: string): Promise<ApiResponse> {
        const response = await fetch(`${API_BASE}/api/resend-verification`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Gửi lại email xác thực thất bại');
        }

        return data;
    }

    async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
        const response = await fetch(`${API_BASE}/api/user/change-password`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Đổi mật khẩu thất bại');
        }

        return data;
    }
}

export const authService = new AuthService();
