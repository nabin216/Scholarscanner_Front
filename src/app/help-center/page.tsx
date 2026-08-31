import React from 'react';
import Link from 'next/link';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions and get the support you need
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Help Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/faq" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">FAQ</h3>
              </div>
              <p className="text-gray-600">Find answers to frequently asked questions about scholarships and our platform.</p>
            </Link>

            <Link href="/support-team" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Support Team</h3>
              </div>
              <p className="text-gray-600">Get personalized help from our dedicated support team.</p>
            </Link>

            <Link href="/how-it-works" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">How it Works</h3>
              </div>
              <p className="text-gray-600">Learn how to make the most of our scholarship platform.</p>
            </Link>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Topics</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-blue-600 hover:text-blue-800">How to create an account</Link></li>
                <li><Link href="#" className="text-blue-600 hover:text-blue-800">Setting up your profile</Link></li>
                <li><Link href="#" className="text-blue-600 hover:text-blue-800">Finding scholarships that match you</Link></li>
              </ul>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Applying for Scholarships</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-blue-600 hover:text-blue-800">How to submit an application</Link></li>
                <li><Link href="#" className="text-blue-600 hover:text-blue-800">Required documents and essays</Link></li>
                <li><Link href="#" className="text-blue-600 hover:text-blue-800">Tracking your applications</Link></li>
              </ul>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Management</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-blue-600 hover:text-blue-800">Updating your information</Link></li>
                <li><Link href="#" className="text-blue-600 hover:text-blue-800">Managing saved scholarships</Link></li>
                <li><Link href="#" className="text-blue-600 hover:text-blue-800">Account settings and privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-in-touch" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Contact Support
            </Link>
            <Link href="/support-team" className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-blue-600">
              Live Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
