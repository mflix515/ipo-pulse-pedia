
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlacement from '@/components/AdPlacement';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="disclaimer-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
              
              <div className="prose max-w-none">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold text-red-800 mb-2">Important Notice</h2>
                  <p className="text-red-700">
                    All investments in securities market are subject to market risks. Read all the related documents carefully before investing.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">General Information</h2>
                <p className="text-gray-700 mb-6">
                  The information provided on IPO-Pedia is for educational and informational purposes only. 
                  It should not be considered as investment advice or a recommendation to buy or sell any securities.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Guarantee of Returns</h2>
                <p className="text-gray-700 mb-6">
                  IPO-Pedia does not guarantee any returns on investments. Past performance is not indicative of future results. 
                  All investments carry risk of loss, and you should be prepared to lose your entire investment.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Advice</h2>
                <p className="text-gray-700 mb-6">
                  Before making any investment decisions, please consult with qualified financial advisors, 
                  tax consultants, and legal experts who can provide personalized advice based on your specific situation.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accuracy of Information</h2>
                <p className="text-gray-700 mb-6">
                  While we strive to provide accurate and up-to-date information, we cannot guarantee the completeness, 
                  accuracy, or timeliness of the information provided. Market conditions change rapidly.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Links</h2>
                <p className="text-gray-700 mb-6">
                  Our website may contain links to third-party websites. We are not responsible for the content, 
                  accuracy, or reliability of these external sites.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 mb-6">
                  IPO-Pedia and its affiliates shall not be liable for any direct, indirect, incidental, 
                  consequential, or punitive damages arising from your use of this website or investment decisions.
                </p>

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Market Regulator:</strong> This website is for informational purposes only and is not regulated by SEBI or any other market regulator.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="disclaimer-right-sidebar" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Disclaimer;
