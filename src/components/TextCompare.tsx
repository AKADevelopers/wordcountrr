import React, { useState } from 'react';
import * as Diff from 'diff';
import { analyzeText } from '../utils/textAnalyzer';
import FileUpload from './FileUpload';
import { 
  ArrowPathIcon, 
  DocumentMagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  ArrowUturnLeftIcon
} from '@heroicons/react/24/outline';

export default function TextCompare() {
  const [originalText, setOriginalText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [differences, setDifferences] = useState<Diff.Change[]>([]);
  const [isCompared, setIsCompared] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [originalFocused, setOriginalFocused] = useState(false);
  const [modifiedFocused, setModifiedFocused] = useState(false);

  const handleCompare = () => {
    const diff = Diff.diffWords(originalText, modifiedText);
    setDifferences(diff);
    setIsCompared(true);
  };

  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setOriginalText('');
    setModifiedText('');
    setDifferences([]);
    setIsCompared(false);
    setResetKey(prev => prev + 1);
  };

  const calculatePercentageDifference = () => {
    const totalLength = originalText.length + modifiedText.length;
    if (totalLength === 0) return 0;

    const diffLength = differences.reduce((acc, curr) => {
      if (curr.added || curr.removed) {
        return acc + curr.value.length;
      }
      return acc;
    }, 0);

    const percentage = (diffLength / totalLength) * 100;
    return Math.min(Math.round(percentage), 100);
  };

  const handleIncreaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const handleDecreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const handleResetFontSize = () => {
    setFontSize(16);
  };

  const textAreaStyle = {
    fontSize: `${fontSize}px`,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              <span className="text-yellow-500">Text</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Comparison</span>
            </h2>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecreaseFontSize}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-md transition-all duration-200 transform hover:scale-105"
              >
                <MinusIcon className="h-4 w-4 mr-1.5" />
                Minimize Text
              </button>
              <button
                onClick={handleIncreaseFontSize}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-md transition-all duration-200 transform hover:scale-105"
              >
                <PlusIcon className="h-4 w-4 mr-1.5" />
                Maximize Text
              </button>
              <button
                onClick={handleResetFontSize}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md transition-all duration-200 transform hover:scale-105"
              >
                <ArrowUturnLeftIcon className="h-4 w-4 mr-1.5" />
                Reset Size
              </button>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {fontSize}px
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Text Panel */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Original Text</h3>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-500">
                    Words: {analyzeText(originalText).wordCount} | Characters: {analyzeText(originalText).characterCount}
                  </div>
                  <FileUpload 
                    key={`original-${resetKey}`}
                    onFileContent={setOriginalText} 
                    buttonText="Upload Original" 
                  />
                </div>
                <div className="relative h-64">
                  <textarea
                    className="w-full h-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    onFocus={() => setOriginalFocused(true)}
                    onBlur={() => setOriginalFocused(false)}
                    placeholder="Paste original text here..."
                    style={textAreaStyle}
                  />
                  {!originalText && !originalFocused && (
                    <button
                      onClick={async () => {
                        const text = await navigator.clipboard.readText();
                        setOriginalText(text);
                      }}
                      className="absolute inset-0 m-auto w-fit h-fit px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      Paste Here
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Modified Text Panel */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Modified Text</h3>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-500">
                    Words: {analyzeText(modifiedText).wordCount} | Characters: {analyzeText(modifiedText).characterCount}
                  </div>
                  <FileUpload 
                    key={`modified-${resetKey}`}
                    onFileContent={setModifiedText} 
                    buttonText="Upload Modified" 
                  />
                </div>
                <div className="relative h-64">
                  <textarea
                    className="w-full h-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                    value={modifiedText}
                    onChange={(e) => setModifiedText(e.target.value)}
                    onFocus={() => setModifiedFocused(true)}
                    onBlur={() => setModifiedFocused(false)}
                    placeholder="Paste modified text here..."
                    style={textAreaStyle}
                  />
                  {!modifiedText && !modifiedFocused && (
                    <button
                      onClick={async () => {
                        const text = await navigator.clipboard.readText();
                        setModifiedText(text);
                      }}
                      className="absolute inset-0 m-auto w-fit h-fit px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      Paste Here
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleCompare}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              <DocumentMagnifyingGlassIcon className="h-4 w-4 mr-1.5" />
              Compare Texts
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1.5" />
              Reset
            </button>
          </div>

          {isCompared && (
            <div className="mt-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Comparison Results
                  </span>
                </h3>
                
                <div className="mb-4 flex flex-wrap gap-4">
                  <span className="text-sm font-medium">
                    Word count difference: {' '}
                    <span className={`${
                      analyzeText(modifiedText).wordCount - analyzeText(originalText).wordCount > 0 
                        ? 'text-green-600' 
                        : analyzeText(modifiedText).wordCount - analyzeText(originalText).wordCount < 0 
                        ? 'text-red-600' 
                        : 'text-gray-600'
                    }`}>
                      {analyzeText(modifiedText).wordCount - analyzeText(originalText).wordCount > 0 ? '+' : ''}
                      {analyzeText(modifiedText).wordCount - analyzeText(originalText).wordCount} words
                    </span>
                  </span>

                  <span className="text-sm font-medium">
                    Difference percentage: {' '}
                    <span className="text-purple-600 font-bold">
                      {calculatePercentageDifference()}%
                    </span>
                  </span>
                </div>

                <div className="prose max-w-none bg-white p-6 rounded-lg shadow-sm" style={textAreaStyle}>
                  {differences.map((part, index) => (
                    <span
                      key={index}
                      className={`${
                        part.added
                          ? 'bg-green-100 text-green-800'
                          : part.removed
                          ? 'bg-red-100 text-red-800'
                          : ''
                      }`}
                    >
                      {part.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
