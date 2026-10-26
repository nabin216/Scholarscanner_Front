"use client";

/**
 * Authentication utility functions for the Scholarship Portal application
 */

// Check if a token exists in local storage
export const hasToken = (): boolean => {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem('authToken'));
};

// Get the authentication token
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

// Set the authentication token
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('authToken', token);
};

// Remove the authentication token
export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('authToken');
};

const POST_LOGIN_KEY = 'postLoginRedirect';

// Only allow same-site paths, and never send the user back to an auth page
const isSafeRedirect = (path: string | null): path is string =>
  !!path && path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/Authentication');

// Remember the ?next= page before leaving for an external login (e.g. the Google redirect flow)
export const rememberPostLoginRedirect = (): void => {
  if (typeof window === 'undefined') return;
  const next = new URLSearchParams(window.location.search).get('next');
  if (isSafeRedirect(next)) sessionStorage.setItem(POST_LOGIN_KEY, next);
};

// Where to go after logging in: the page the user came from (?next=...), otherwise the homepage
export const getPostLoginRedirect = (): string => {
  if (typeof window === 'undefined') return '/';
  const next = new URLSearchParams(window.location.search).get('next') || sessionStorage.getItem(POST_LOGIN_KEY);
  sessionStorage.removeItem(POST_LOGIN_KEY);
  return isSafeRedirect(next) ? next : '/';
};

// Login link that brings the user back to the current page afterwards
export const loginHref = (): string => {
  if (typeof window === 'undefined') return '/Authentication/login';
  const here = window.location.pathname + window.location.search;
  return isSafeRedirect(here) && here !== '/' ? `/Authentication/login?next=${encodeURIComponent(here)}` : '/Authentication/login';
};

// Get authentication headers for API requests
export const getAuthHeaders = (): { 'Authorization': string } | undefined => {
  const token = getToken();
  if (!token) return undefined;
  return { 'Authorization': `Bearer ${token}` };
};

// Refresh the access token using the refresh token
export const refreshToken = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;
    try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    
    if (!response.ok) {
      // If refresh token is invalid, clear all tokens
      removeToken();
      localStorage.removeItem('refreshToken');
      return false;
    }
    
    const data = await response.json();
    // Update the access token
    setToken(data.access);
    
    // If a new refresh token is provided, update it
    if (data.refresh) {
      localStorage.setItem('refreshToken', data.refresh);
    }
    
    return true;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
};

// Make an authenticated API request
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  // Handle token expiration
  if (response.status === 401) {
    // Token might be expired, remove it
    removeToken();
    // Redirect to login page if needed
    if (typeof window !== 'undefined') {
      window.location.href = '/Authentication/login';
    }
  }

  return response;
};

// Perform a profile data fetch
export const fetchUserProfile = async () => {  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/user/users/profile/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Save a scholarship to the user's bookmarks
export const saveScholarship = async (scholarshipId: number) => {  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/user/saved-scholarships/`,
      {
        method: 'POST',
        body: JSON.stringify({ scholarship_id: scholarshipId }),
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to save scholarship');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving scholarship:', error);
    throw error;
  }
};

// Remove a scholarship from the user's bookmarks
export const unsaveScholarship = async (savedScholarshipId: number) => {  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/user/saved-scholarships/${savedScholarshipId}/`,
      {
        method: 'DELETE',
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to remove saved scholarship');
    }
    
    return true;
  } catch (error) {
    console.error('Error removing saved scholarship:', error);
    throw error;
  }
};

// Check if a user is authenticated
export const isAuthenticated = (): boolean => {
  return hasToken();
};

// Parse JWT token (if your backend uses JWT)
export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};

// Check if token is expired (if using JWT)
export const isTokenExpired = (token: string): boolean => {
  const decodedToken = parseJwt(token);
  if (!decodedToken) return true;
  
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
