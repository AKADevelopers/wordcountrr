import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-yellow-500">Terms of</span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Service</span>
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Acceptance of Terms</h2>
          <p className="text-gray-700">By accessing and using wordcountrr, you accept and agree to be bound by the terms and conditions of this agreement.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Use License</h2>
          <p className="text-gray-700">Permission is granted to temporarily use this website for personal, non-commercial transitory viewing only.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Disclaimer</h2>
          <p className="text-gray-700">The materials on wordcountrr's website are provided on an 'as is' basis. wordcountrr makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Limitations</h2>
          <p className="text-gray-700">In no event shall wordcountrr or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on wordcountrr's website.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Accuracy of Materials</h2>
          <p className="text-gray-700">The materials appearing on wordcountrr's website could include technical, typographical, or photographic errors. wordcountrr does not warrant that any of the materials on its website are accurate, complete, or current.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Modifications</h2>
          <p className="text-gray-700">wordcountrr may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms of service.</p>
        </section>
      </div>
    </div>
  );
}