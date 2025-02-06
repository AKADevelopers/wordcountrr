import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-yellow-500">Privacy</span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Policy</span>
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Information We Collect</h2>
          <p className="text-gray-700">We collect information that you provide directly to us when using our text analysis tools. This includes the text content you input for analysis, comparison, or manipulation.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">How We Use Your Information</h2>
          <p className="text-gray-700">The text you input is processed locally in your browser. We do not store or transmit your text content to any external servers. Your text history is stored locally on your device.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Data Storage</h2>
          <p className="text-gray-700">All text processing occurs locally in your browser. Your text history is stored in your browser's local storage and is not accessible to us or any third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Security</h2>
          <p className="text-gray-700">We prioritize the security of your information. Since all processing occurs locally, your text content remains private and secure on your device.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Updates to This Policy</h2>
          <p className="text-gray-700">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact Us</h2>
          <p className="text-gray-700">If you have any questions about this Privacy Policy, please contact us.</p>
        </section>
      </div>
    </div>
  );
}