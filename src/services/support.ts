import ApiClient from './api';

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  subscribe_newsletter: boolean;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    subject: string;
    message: string;
    subscribe_newsletter: boolean;
    created_at: string;
  };
}

/**
 * Support service for contact form and support-related API calls
 */
const SupportService = {
  /**
   * Submit a contact form message
   * @param formData - Contact form data
   * @returns Promise with the response
   */
  async submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
    return ApiClient.post('support/contact/', formData);
  },
};

export default SupportService;
