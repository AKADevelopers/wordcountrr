import React, { useState } from 'react';
import { GlobeAltIcon, ArrowPathIcon, ClipboardDocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { analyzeText } from '../utils/textAnalyzer';

export default function WebsiteWordCounter() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<ReturnType<typeof analyzeText> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      // Validate URL format first
      if (!/^https?:\/\//i.test(url)) {
        throw new Error('Invalid URL - must start with http:// or https://');
      }

      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data?.contents) {
        throw new Error('No content found - website might be blocking access');
      }

      // Create a temporary div to parse HTML and extract text
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data.contents;
      
      // Remove scripts, styles, and other non-content elements
      const elementsToRemove = tempDiv.querySelectorAll('script, style, meta, link, noscript');
      elementsToRemove.forEach(el => el.remove());
      
      // Get text content
      const text = tempDiv.textContent || '';
      const textStats = analyzeText(text);
      setStats(textStats);
      
    } catch (error) {
      toast.error('Failed to analyze website. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Website Word Counter
        </span>
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL..."
              className="w-full p-2 pr-8 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 justify-center sm:justify-start">
            <button
              type="button"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  setUrl(text);
                  toast.success('URL pasted from clipboard');
                } catch (err) {
                  toast.error('Failed to paste URL');
                }
              }}
              className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Paste from clipboard"
            >
              <ClipboardDocumentIcon className="h-4 w-4" />
              <span className="hidden sm:inline ml-1.5">Paste</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? (
                <ArrowPathIcon className="h-4 w-4 mr-1 sm:mr-1.5 animate-spin" />
              ) : (
                <GlobeAltIcon className="h-4 w-4 mr-1 sm:mr-1.5" />
              )}
              <span>Analyze</span>
            </button>
          </div>
        </div>
      </form>

      {stats && (
        <div className="mt-3 sm:mt-4 p-2 sm:p-4 bg-gray-50 rounded-md">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <span className="text-xs sm:text-sm text-gray-500">Words</span>
              <p className="text-base sm:text-xl font-bold text-gray-900">{stats.wordCount}</p>
            </div>
            <div>
              <span className="text-xs sm:text-sm text-gray-500">Characters</span>
              <p className="text-base sm:text-xl font-bold text-gray-900">{stats.characterCount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
