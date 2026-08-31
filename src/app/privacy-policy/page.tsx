import React from 'react';

export const metadata = {
  title: 'Privacy Policy - Scholar Scanner',
  description: 'Privacy Policy for Scholar Scanner - How we collect, use, and protect your information',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">
            <strong>Last Updated:</strong> December 12, 2025
          </p>

          <div className="prose prose-blue max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Scholar Scanner ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our scholarship discovery platform at scholarscanner.com and nabin216.github.io/scholarship-portal (collectively, the "Service").
              </p>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using Scholar Scanner, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Account Information:</strong> Name, email address, password, profile picture, and educational background</li>
                <li><strong>Profile Data:</strong> Academic level, field of study, country, GPA, test scores, and other educational qualifications</li>
                <li><strong>Application Data:</strong> Saved scholarships, application status, and preferences</li>
                <li><strong>Communication Data:</strong> Messages sent through our AI assistant, support inquiries, and feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Usage Data:</strong> Pages visited, features used, search queries, and interaction patterns</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li><strong>Log Data:</strong> Access times, error logs, and performance metrics</li>
                <li><strong>Cookies and Tracking:</strong> Authentication tokens, preferences, and analytics data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Third-Party Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Social Media:</strong> When you connect your Facebook account or interact with our Facebook page, we may receive basic profile information</li>
                <li><strong>OAuth Providers:</strong> Profile information from Google or other authentication providers</li>
                <li><strong>Public Sources:</strong> Scholarship information from universities, organizations, and publicly available databases</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Service Delivery:</strong> To provide, maintain, and improve our scholarship discovery platform</li>
                <li><strong>Personalization:</strong> To match you with relevant scholarships based on your profile</li>
                <li><strong>Authentication:</strong> To verify your identity and secure your account</li>
                <li><strong>Communication:</strong> To send you scholarship recommendations, notifications, and updates</li>
                <li><strong>AI Features:</strong> To power our AI assistant and provide personalized guidance</li>
                <li><strong>Social Media Integration:</strong> To display scholarship opportunities from our Facebook page and automate content distribution</li>
                <li><strong>Analytics:</strong> To understand user behavior and improve our Service</li>
                <li><strong>Support:</strong> To respond to your inquiries and provide customer service</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our Terms of Service</li>
              </ul>
            </section>

            {/* Facebook Integration and Automation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Facebook Integration and Automation</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Scholar Scanner uses Facebook's Graph API to enhance our Service. This integration allows us to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Collect and display scholarship posts from our official Scholar Scanner Facebook page</li>
                <li>Automate the distribution of scholarship opportunities across multiple platforms using n8n workflow automation</li>
                <li>Allow you to log in using your Facebook account (optional)</li>
                <li>Enable social sharing features for scholarship opportunities</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Data We Collect from Facebook:</strong> When you connect your Facebook account, we may access your public profile (name, profile picture, email) and any permissions you explicitly grant. We do not post on your behalf without your explicit permission.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Automated Processing:</strong> We use n8n automation to fetch public posts from our Facebook page at regular intervals. This data is processed to display scholarship opportunities on our platform. No private user data is collected through this automation.
              </p>
            </section>

            {/* How We Share Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. How We Share Your Information</h2>
              <p className="text-gray-700 mb-3">We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (hosting, analytics, email delivery, automation tools like n8n)</li>
                <li><strong>Social Media Platforms:</strong> With Facebook and other social media platforms when you use social login or sharing features</li>
                <li><strong>Scholarship Providers:</strong> When you apply for scholarships, we may share your profile with the respective institutions (only with your consent)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>We do not sell your personal information to third parties.</strong>
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Encrypted data transmission using HTTPS/SSL</li>
                <li>Secure password hashing using industry-standard algorithms</li>
                <li>JWT (JSON Web Token) authentication for API access</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure cloud infrastructure (AWS, Azure, or equivalent)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Provide our Service to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain backup and business continuity</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it by law.
              </p>
            </section>

            {/* Your Rights and Choices */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-3">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails and notifications</li>
                <li><strong>Data Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Withdraw Consent:</strong> Revoke permissions for social media integrations</li>
                <li><strong>Object to Processing:</strong> Object to certain uses of your data</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us at <a href="mailto:privacy@scholarscanner.com" className="text-blue-600 hover:underline">privacy@scholarscanner.com</a>
              </p>
            </section>

            {/* Cookies and Tracking Technologies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Essential Cookies:</strong> Required for authentication and site functionality</li>
                <li><strong>Analytics Cookies:</strong> To understand how users interact with our Service</li>
                <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
                <li><strong>Social Media Cookies:</strong> To enable Facebook login and social sharing</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookie settings through your browser preferences. However, disabling cookies may limit certain features of our Service.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Third-Party Services</h2>
              <p className="text-gray-700 mb-3">Our Service integrates with third-party services, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Facebook/Meta:</strong> For social login, page integration, and Graph API access</li>
                <li><strong>Google:</strong> For OAuth authentication and analytics</li>
                <li><strong>n8n:</strong> For workflow automation and data synchronization</li>
                <li><strong>AWS SES:</strong> For email delivery and notifications</li>
                <li><strong>Cloud Hosting Providers:</strong> For infrastructure and data storage</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                These third parties have their own privacy policies. We encourage you to review them. We are not responsible for the privacy practices of third-party services.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately, and we will delete such information.
              </p>
            </section>

            {/* International Data Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards, including standard contractual clauses.
              </p>
            </section>

            {/* Changes to This Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes by:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Posting the updated policy on this page with a new "Last Updated" date</li>
                <li>Sending you an email notification (for significant changes)</li>
                <li>Displaying a prominent notice on our Service</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Your continued use of the Service after changes become effective constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Scholar Scanner Privacy Team</strong></p>
                <p className="text-gray-700 mb-2">Email: <a href="mailto:privacy@scholarscanner.com" className="text-blue-600 hover:underline">privacy@scholarscanner.com</a></p>
                <p className="text-gray-700 mb-2">Support: <a href="mailto:support@scholarscanner.com" className="text-blue-600 hover:underline">support@scholarscanner.com</a></p>
                <p className="text-gray-700">Website: <a href="https://scholarscanner.com" className="text-blue-600 hover:underline">https://scholarscanner.com</a></p>
              </div>
            </section>

            {/* GDPR and CCPA Compliance */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. GDPR and CCPA Compliance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>For EU Users (GDPR):</strong> If you are located in the European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR), including the right to lodge a complaint with a supervisory authority.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>For California Users (CCPA):</strong> If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and the right to opt-out of the sale of personal information (we do not sell your information).
              </p>
            </section>

            {/* Meta Platform Compliance */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Meta Platform Compliance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Scholar Scanner uses Facebook's Platform APIs and complies with Meta's Platform Terms and Policies. Our use of Facebook data is limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Fetching public posts from our official Scholar Scanner Facebook page</li>
                <li>Providing social login functionality (with user consent)</li>
                <li>Enabling content sharing features</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We do not use Facebook data for advertising purposes outside of the Meta platform, and we do not transfer Facebook data to data brokers or ad networks.
              </p>
            </section>

            {/* Acknowledgment */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Acknowledgment</h2>
              <p className="text-gray-700 leading-relaxed">
                By using Scholar Scanner, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as described herein.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              This Privacy Policy is effective as of December 12, 2025, and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
