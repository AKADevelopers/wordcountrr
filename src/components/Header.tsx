import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          <Link to="/text-editor" className="text-xl sm:text-2xl font-bold hover:opacity-90 transition-opacity">
            <span className="text-yellow-500">word</span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">countr</span>
            <span className="text-yellow-500">r</span>
          </Link>
          
          <div className="flex space-x-2 sm:space-x-4">
            <Link
              to="/text-editor"
              className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 ${
                location.pathname === '/text-editor'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Text Editor
            </Link>
            <Link
              to="/compare"
              className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 ${
                location.pathname === '/compare'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Compare
            </Link>
            <Link
              to="/website-counter"
              className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 ${
                location.pathname === '/website-counter'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Website Counter
            </Link>
            <Link
              to="/history"
              className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 ${
                location.pathname === '/history'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              History
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
