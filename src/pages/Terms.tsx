
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlacement from '@/components/AdPlacement';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="terms-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
              
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-6">
                  By accessing and using IPO-Pedia, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
                <p className="text-gray-700 mb-4">
                  Permission is granted to temporarily download one copy of the materials on IPO-Pedia for personal, non-commercial transitory viewing only.
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-6">
                  <li>This is the grant of a license, not a transfer of title</li>
                  <li>Under this license you may not modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
                <p className="text-gray-700 mb-6">
                  The materials on IPO-Pedia are provided on an 'as is' basis. IPO-Pedia makes no warranties, 
                  expressed or implied, and hereby disclaims all other warranties including without limitation, 
                  implied warranties or conditions of merchantability, fitness for a particular purpose.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Investment Risks</h2>
                <p className="text-gray-700 mb-6">
                  All investments in securities market are subject to market risks. Read all the related documents 
                  carefully before investing. IPO-Pedia does not guarantee returns and is not responsible for any losses.
                </p>

                <h2 className="text-2xl font-semibund text-gray-900 mb-4">5. User Accounts</h2>
                <p className="text-gray-700 mb-6">
                  Users are responsible for maintaining the confidentiality of their account information and passwords. 
                  You agree to accept responsibility for all activities that occur under your account.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Modifications</h2>
                <p className="text-gray-700 mb-6">
                  IPO-Pedia may revise these terms of service at any time without notice. By using this website, 
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="terms-right-sidebar" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
