import React from 'react';

export const metadata = {
  title: 'Terms of Service - Scholar Scanner',
  description: 'Terms of Service for Scholar Scanner - Rules and guidelines for using our platform',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">
            <strong>Last Updated:</strong> December 12, 2025
          </p>

          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using Scholar Scanner, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                Scholar Scanner is a scholarship discovery platform that helps students find and apply for educational funding opportunities worldwide. We provide personalized scholarship recommendations, application tracking, and AI-powered assistance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-3">You agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the Service in compliance with all applicable laws</li>
                <li>Not misuse or abuse the Service</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, features, and functionality of Scholar Scanner are owned by us and protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                The Service is provided "as is" without warranties of any kind. We do not guarantee scholarship availability, acceptance, or award amounts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">Email: <a href="mailto:support@scholarscanner.com" className="text-blue-600 hover:underline">support@scholarscanner.com</a></p>
                <p className="text-gray-700">Website: <a href="https://scholarscanner.com" className="text-blue-600 hover:underline">https://scholarscanner.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
