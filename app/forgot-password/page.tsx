'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/lib/auth-service';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await authService.forgotPassword({ email });
      
      if (response.success) {
        setMessage(response.message);
        setIsSubmitted(true);
      } else {
        setError(response.message || 'Failed to send reset email');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred while sending reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🔑</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {isSubmitted ? 'Check Your Email' : 'Forgot Password?'}
          </CardTitle>
          <CardDescription className="text-center">
            {isSubmitted 
              ? 'We sent you a password reset link'
              : 'Enter your email to reset your password'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded">
                ✅ {message}
              </div>
              
              <div className="text-sm text-gray-600 text-center">
                Check your email for a password reset link. If you don't see it, check your spam folder.
              </div>
              
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                  setMessage('');
                  setError('');
                }}
                variant="outline"
                className="w-full"
              >
                Send Another Reset Link
              </Button>
            </div>
          )}

          <div className="flex justify-center space-x-1 text-sm text-gray-600 mt-6">
            <span>Remember your password?</span>
            <Link href="/login" className="text-orange-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}