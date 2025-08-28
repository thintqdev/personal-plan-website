'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/lib/auth-service';

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');
    
    if (emailParam) {
      setEmail(emailParam);
    }

    if (token) {
      // Auto-verify if token is present in URL
      handleVerification(token);
    }
  }, [searchParams]);

  const handleVerification = async (token: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.verifyEmail(token);
      
      if (response.success) {
        setIsVerified(true);
        setMessage('Email verified successfully! You can now access all features.');
      } else {
        setError(response.message || 'Email verification failed');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during email verification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError('Email address is required to resend verification');
      return;
    }

    setIsResending(true);
    setError('');
    setMessage('');

    try {
      const response = await authService.resendVerification({ email });
      
      if (response.success) {
        setMessage('Verification email sent! Please check your inbox.');
      } else {
        setError(response.message || 'Failed to resend verification email');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred while resending verification email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">✉️</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {isVerified ? 'Email Verified!' : 'Verify Your Email'}
          </CardTitle>
          <CardDescription className="text-center">
            {isVerified 
              ? 'Your email has been successfully verified'
              : 'Check your email for a verification link'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="mt-2 text-gray-600">Verifying your email...</p>
            </div>
          )}

          {isVerified && (
            <div className="text-center space-y-4">
              <div className="text-green-600 text-sm bg-green-50 p-3 rounded">
                ✅ {message}
              </div>
              <Button onClick={() => router.push('/admin')} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          )}

          {!isVerified && !isLoading && (
            <div className="space-y-4">
              {email && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  We sent a verification email to: <strong>{email}</strong>
                </div>
              )}

              <div className="text-sm text-gray-600 text-center">
                Click the verification link in your email to activate your account.
                If you don't see the email, check your spam folder.
              </div>

              <Button
                onClick={handleResendVerification}
                variant="outline"
                className="w-full"
                disabled={isResending || !email}
              >
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </Button>
            </div>
          )}

          {message && !isVerified && (
            <div className="text-blue-600 text-sm text-center bg-blue-50 p-2 rounded">
              {message}
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="text-center pt-4">
            <Link href="/login" className="text-sm text-purple-600 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}