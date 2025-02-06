import React, { useState, useEffect } from 'react';
import { DocumentArrowUpIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { analyzeText } from '../utils/textAnalyzer';
import TextStats from './TextStats';
import TextToolbar from './TextToolbar';
import { useTextStore } from '../store/textStore';
import { useTextSize } from '../hooks/useTextSize';
import FileUpload from './FileUpload';
import toast from 'react-hot-toast';

export default function TextEditor() {
  const { currentText, setText, addToHistory } = useTextStore();
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize, style } = useTextSize();
  const [showPasteButton, setShowPasteButton] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setShowPasteButton(currentText === '' && !isFocused);
  }, [currentText, isFocused]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setText(text);
      addToHistory(text);
      setShowPasteButton(false);
      toast.success('Text pasted from clipboard');
    } catch (err) {
      toast.error('Failed to paste text');
    }
  };

  const stats = analyzeText(currentText);

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <TextToolbar 
            text={currentText}
            onTextChange={setText}
            fontSize={fontSize}
            onIncreaseFontSize={increaseFontSize}
            onDecreaseFontSize={decreaseFontSize}
            onResetFontSize={resetFontSize}
          />

          <div className="p-4">
            <div className="relative">
              <textarea
                className="w-full h-96 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-y-auto prose max-w-none"
                style={style}
                value={currentText}
                onChange={(e) => {
                  setText(e.target.value);
                  addToHistory(e.target.value);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              
              {showPasteButton && (
                <div className="absolute top-4 left-4 text-gray-400 text-lg pointer-events-none">
                  Type or paste your text here...
                </div>
              )}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row flex-wrap justify-center gap-4">
                {showPasteButton && (
                  <>
                    <FileUpload 
                      onFileContent={setText} 
                      buttonText={
                        <span className="flex items-center px-8 py-3 text-base">
                          <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
                          Upload File
                        </span>
                      }
                    />
                    <button
                      onClick={handlePaste}
                      className="flex items-center px-8 py-3 text-base font-medium text-white bg-[#f59e0a] rounded-md transition-all duration-200 transform hover:scale-105 hover:opacity-90"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
                      Paste Text
                    </button>
                  </>
                )}
              </div>
            </div>

            <TextStats stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
