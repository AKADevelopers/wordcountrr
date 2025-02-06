import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
              <span className="text-yellow-500">word</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">countr</span>
              <span className="text-yellow-500">r</span>
            </Link>
            <p className="mt-4 text-gray-600">
              A powerful text analysis and manipulation tool for writers, editors, and content creators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
              <Link to="/text-editor" className="text-gray-600 hover:text-gray-900 transition-colors">
                Text Editor
              </Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Compare Texts
                </Link>
              </li>
              <li>
                <Link to="/website-counter" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Website Word Counter
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-600 hover:text-gray-900 transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Features
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600">Word & Character Count</li>
              <li className="text-gray-600">Text Comparison</li>
              <li className="text-gray-600">Website Content Analysis</li>
              <li className="text-gray-600">Case Conversion</li>
              <li className="text-gray-600">Export to Multiple Formats</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} wordcountrr. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
