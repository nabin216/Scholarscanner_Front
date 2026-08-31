'use client';

import React from 'react';
import Link from 'next/link';
import LiveChat from '@/components/LiveChat';

const SupportTeam = () => {
  const [chatOpen, setChatOpen] = React.useState(false);
  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team during business hours",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      availability: "Mon-Fri, 9 AM - 6 PM EST",
      action: "Start Chat",
      onClick: () => setChatOpen(true),
      color: "blue"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message and we'll respond within 24 hours",
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      availability: "24/7 - Response within 24 hours",
      action: "Send Email",
      href: "mailto:support@scholarScanner.com",
      color: "green"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our support team for urgent matters",
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      availability: "Mon-Fri, 10 AM - 5 PM EST",
      action: "Call Now",
      href: "tel:+1-555-SCHOLAR",
      color: "purple"
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Head of Student Success",
      bio: "Sarah has been helping students find scholarship opportunities for over 8 years. She specializes in academic scholarships and merit-based awards.",
      image: "/images/team-sarah.jpg",
      expertise: ["Academic Scholarships", "Merit Awards", "Application Strategy"]
    },
    {
      name: "Michael Chen",
      role: "Technical Support Lead",
      bio: "Michael ensures our platform runs smoothly and helps users navigate any technical challenges they encounter.",
      image: "/images/team-michael.jpg",
      expertise: ["Platform Support", "Account Issues", "Technical Troubleshooting"]
    },
    {
      name: "Maria Rodriguez",
      role: "Community Outreach Specialist",
      bio: "Maria focuses on connecting underrepresented students with opportunities and provides personalized guidance.",
      image: "/images/team-maria.jpg",
      expertise: ["Diversity Scholarships", "Community Outreach", "Student Mentoring"]
    },
    {
      name: "David Kim",
      role: "Financial Aid Advisor",
      bio: "David helps students understand financial aid options and navigate the complex world of education funding.",
      image: "/images/team-david.jpg",
      expertise: ["Financial Aid", "Need-based Scholarships", "FAFSA Guidance"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LiveChat defaultOpen={chatOpen} />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Support Team</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated team is here to help you succeed in your scholarship journey
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support Channels */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Get Help Now</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-${channel.color}-100 rounded-lg flex items-center justify-center mr-4`}>
                    {channel.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{channel.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <p className="text-sm text-gray-500 mb-4">{channel.availability}</p>
                {channel.title === "Live Chat" ? (
                  <button
                    onClick={() => setChatOpen(true)}
                    className={`inline-block w-full text-center bg-${channel.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${channel.color}-700 transition-colors font-medium cursor-pointer`}
                  >
                    {channel.action}
                  </button>
                ) : (
                  <a 
                    href={channel.href}
                    className={`inline-block w-full text-center bg-${channel.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${channel.color}-700 transition-colors font-medium`}
                  >
                    {channel.action}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                <div className="space-y-1">
                  {member.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Support Hours</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Chat & Phone</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 3:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Support</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span>Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability</span>
                  <span>24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority Support</span>
                  <span>Within 4 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-red-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Urgent Support</h3>
              <p className="text-red-700 mb-3">
                For time-sensitive scholarship deadlines or urgent technical issues, please call our emergency line.
              </p>
              <a href="tel:+1-555-URGENT" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Emergency Line: 1-555-URGENT
              </a>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/help-center" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Help Center
            </Link>
            <Link href="/faq" className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-blue-600">
              FAQ
            </Link>
            <Link href="/how-it-works" className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-blue-600">
              How it Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTeam;
