"use client";

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { handleGoogleCallback } = useAuth();

  useEffect(() => {
    // Function to extract token from URL hash or query params
    const getGoogleAuthData = () => {
      // Handle query parameters (allauth typically returns in query params)
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('id_token') || '';
      const email = urlParams.get('email') || '';
      const name = urlParams.get('name') || '';

      // If we have an id_token, process the auth
      if (token) {
        handleGoogleCallback(token, { email, name })
          .then(() => {
            // Close popup if in popup mode, or redirect if in main window
            if (window.opener) {
              // We're in a popup - post message to parent window
              window.opener.postMessage({
                type: 'GOOGLE_AUTH_SUCCESS',
                token,
                user: { email, name }
              }, window.location.origin);
              window.close();            } else {
              // We're not in a popup - redirect
              router.push('/profile');
            }
          })
          .catch(error => {
            console.error('Error during Google auth callback:', error);
            router.push('/Authentication/login?error=google-auth-failed');
          });
      } else {
        // No token found - likely an error
        console.error('No authentication token found in the callback URL');
        router.push('/Authentication/login?error=no-token');
      }
    };

    getGoogleAuthData();
  }, [handleGoogleCallback, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mt-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Processing your Google login...
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
