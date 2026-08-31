import ApiClient from './api';

/**
 * Service for authentication-related API operations
 */
export class AuthService {
  /**
   * Register a new user
   * @param userData - User registration data
   * @returns Promise with the registration result
   */
  static async register(userData: {
    email: string;
    password: string;
    full_name: string;
  }) {
    return ApiClient.post('users/register/', userData);
  }

  /**
   * Verify email with OTP code
   * @param verificationData - Email and OTP data
   * @returns Promise with the verification result
   */
  static async verifyOtp(verificationData: { email: string; otp_code: string }) {
    return ApiClient.post('users/verify-otp/', verificationData);
  }

  /**
   * Log in a user
   * @param credentials - User login credentials
   * @returns Promise with the login result including tokens
   */
  static async login(credentials: { email: string; password: string }) {
    const response = await ApiClient.post('users/login/', credentials);
    
    // Store the token in localStorage if login was successful
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  /**
   * Log out the current user
   */
  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Check if a user is currently logged in
   * @returns boolean indicating if user is logged in
   */
  static isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }

  /**
   * Get the current user data
   * @returns User object or null if not logged in
   */
  static getCurrentUser() {
    if (typeof window === 'undefined') return null;
    
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Get user profile data
   * @returns Promise with the user profile data
   */
  static async getUserProfile() {
    return ApiClient.get('users/profile/');
  }

  /**
   * Update user profile data
   * @param profileData - Updated profile data
   * @returns Promise with the updated profile
   */
  static async updateUserProfile(profileData: any) {
    return ApiClient.put('users/profile/', profileData);
  }

  /**
   * Request password reset
   * @param email - User email address
   * @returns Promise with the request result
   */
  static async requestPasswordReset(email: string) {
    return ApiClient.post('users/request-password-reset/', { email });
  }

  /**
   * Reset password with token
   * @param resetData - Password reset data
   * @returns Promise with the reset result
   */
  static async resetPassword(resetData: {
    token: string;
    password: string;
  }) {
    return ApiClient.post('users/reset-password/', resetData);
  }
}

export default AuthService;
