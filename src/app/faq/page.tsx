import React from 'react';
import Link from 'next/link';

const FAQ = () => {
  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account on ScholarScanner?",
          answer: "Creating an account is simple! Click the 'Sign Up' button at the top of the page, fill in your basic information, and verify your email address. You can also sign up using your Google account for faster registration."
        },
        {
          question: "Is ScholarScanner free to use?",
          answer: "Yes, ScholarScanner is completely free for students. We believe every student should have access to scholarship opportunities regardless of their financial situation."
        },
        {
          question: "What information do I need to provide in my profile?",
          answer: "To get the best scholarship matches, we recommend providing information about your academic achievements, extracurricular activities, field of study, financial need, and personal background. The more complete your profile, the better we can match you with relevant scholarships."
        }
      ]
    },
    {
      category: "Finding Scholarships",
      questions: [
        {
          question: "How does the scholarship matching work?",
          answer: "Our advanced algorithm analyzes your profile information and matches you with scholarships based on your academic achievements, field of study, demographics, extracurricular activities, and other criteria specified by scholarship providers."
        },
        {
          question: "How often are new scholarships added?",
          answer: "We continuously update our database with new scholarship opportunities. New scholarships are added daily, and we recommend checking back regularly or enabling notifications to stay updated on new matches."
        },
        {
          question: "Can I save scholarships for later?",
          answer: "Absolutely! Click the bookmark icon on any scholarship to save it to your 'Saved Scholarships' list. You can access your saved scholarships anytime from your profile dashboard."
        }
      ]
    },
    {
      category: "Applications",
      questions: [
        {
          question: "How do I apply for scholarships through ScholarScanner?",
          answer: "While ScholarScanner helps you discover scholarships, applications are typically submitted directly to the scholarship provider. Each scholarship listing includes detailed application instructions and links to the provider's application portal."
        },
        {
          question: "Can I track my scholarship applications?",
          answer: "Yes! You can track the status of your applications in the 'My Applications' section of your profile. Mark scholarships as 'Applied', 'In Progress', or 'Submitted' to keep track of your progress."
        },
        {
          question: "What documents do I typically need for scholarship applications?",
          answer: "Common requirements include transcripts, letters of recommendation, personal essays, proof of enrollment, financial documents, and sometimes portfolios or test scores. Each scholarship has specific requirements listed in its details."
        }
      ]
    },
    {
      category: "Account & Technical",
      questions: [
        {
          question: "I forgot my password. How can I reset it?",
          answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
        },
        {
          question: "How do I update my profile information?",
          answer: "Go to your profile dashboard and click 'Edit Profile'. You can update your academic information, personal details, and preferences at any time. Remember to save your changes!"
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account at any time. Go to Account Settings and select 'Delete Account'. Please note that this action is permanent and cannot be undone."
        }
      ]
    },
    {
      category: "Eligibility & Requirements",
      questions: [
        {
          question: "Do I need to be a US citizen to use ScholarScanner?",
          answer: "No! While many scholarships are for US citizens, we also feature opportunities for international students, DACA recipients, and students with various citizenship statuses. Use our filters to find scholarships you're eligible for."
        },
        {
          question: "What if I don't have a high GPA?",
          answer: "Don't worry! While some scholarships require high GPAs, many others focus on different criteria like community service, leadership, creativity, financial need, or specific talents. There are opportunities for students at all academic levels."
        },
        {
          question: "Are there scholarships for graduate students?",
          answer: "Yes! We feature scholarships for undergraduate, graduate, and doctoral students. Use the 'Education Level' filter in your search to find opportunities specific to your academic level."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to the most common questions about ScholarScanner
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Box */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, faqIndex) => (
                  <details key={faqIndex} className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                      <svg 
                        className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Didn't find what you were looking for?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is always ready to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-in-touch" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Contact Support
            </Link>
            <Link href="/help-center" className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-blue-600">
              Browse Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
