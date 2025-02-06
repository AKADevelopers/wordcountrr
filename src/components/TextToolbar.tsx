import React, { useState } from 'react';
import {
  ArrowPathIcon,
  ClipboardDocumentIcon,
  CloudArrowUpIcon,
  ArrowsUpDownIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
  ArrowsRightLeftIcon,
  NoSymbolIcon,
  DocumentTextIcon,
  DocumentIcon,
  DocumentArrowUpIcon,
  BackwardIcon,
} from '@heroicons/react/24/outline';
import SaveOptions from './SaveOptions';
import { useTextActions } from '../hooks/useTextActions';
import { useTextHistory } from '../hooks/useTextHistory';

interface TextToolbarProps {
  text: string;
  onTextChange: (text: string) => void;
  fontSize: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onResetFontSize: () => void;
}

export default function TextToolbar({ 
  text, 
  onTextChange,
  fontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onResetFontSize
}: TextToolbarProps) {
  const [saveOptionsOpen, setSaveOptionsOpen] = useState(false);
  const { currentText, updateText, resetText } = useTextHistory(text);
  const { 
    handleClear,
    handleCopy,
    handleUpperCase,
    handleLowerCase,
    handleTitleCase,
    handleCapitalizeSentences,
    handleRemoveExtraSpaces,
    handleRemoveLineBreaks,
    handleRemoveSpecialChars,
  } = useTextActions(text, (newText) => {
    updateText(text);
    onTextChange(newText);
  });

  const handleResetText = () => {
    const originalText = resetText();
    onTextChange(originalText);
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 p-2 sm:p-4">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleClear}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <ArrowPathIcon className="h-4 w-4 mr-1.5" />
            Clear All
          </button>
          
          <button 
            onClick={handleCopy}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <ClipboardDocumentIcon className="h-4 w-4 mr-1.5" />
            Copy Text
          </button>

          <button 
            onClick={handleUpperCase}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md uppercase"
          >
            <ArrowsUpDownIcon className="h-4 w-4 mr-1.5" />
            UPPERCASE
          </button>
          
          <button 
            onClick={handleLowerCase}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md lowercase"
          >
            <ArrowsUpDownIcon className="h-4 w-4 mr-1.5" />
            lowercase
          </button>
          
          <button 
            onClick={handleTitleCase}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <DocumentTextIcon className="h-4 w-4 mr-1.5" />
            Title Case
          </button>

          <button 
            onClick={handleCapitalizeSentences}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <DocumentIcon className="h-4 w-4 mr-1.5" />
            Capitalize Sentences
          </button>

          <button 
            onClick={handleRemoveExtraSpaces}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <XMarkIcon className="h-4 w-4 mr-1.5" />
            Remove Spaces
          </button>

          <button 
            onClick={handleRemoveLineBreaks}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <ArrowsRightLeftIcon className="h-4 w-4 mr-1.5" />
            Remove Breaks
          </button>

          <button 
            onClick={handleRemoveSpecialChars}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <NoSymbolIcon className="h-4 w-4 mr-1.5" />
            Remove Special Chars
          </button>

          <button
            onClick={handleResetText}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <ArrowUturnLeftIcon className="h-4 w-4 mr-1.5" />
            Reset Text
          </button>

          <button
            onClick={onDecreaseFontSize}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <ArrowsPointingInIcon className="h-4 w-4 mr-1.5" />
            Minimize Text
          </button>

          <button
            onClick={onIncreaseFontSize}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <ArrowsPointingOutIcon className="h-4 w-4 mr-1.5" />
            Maximize Text
          </button>

          <button
            onClick={onResetFontSize}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <ArrowUturnLeftIcon className="h-4 w-4 mr-1.5" />
            Reset Size ({fontSize}px)
          </button>

          <button
            onClick={() => setSaveOptionsOpen(true)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md ml-auto"
          >
            <DocumentArrowUpIcon className="h-4 w-4 mr-1.5" />
            Export Text
          </button>
        </div>
      </div>

      <SaveOptions
        text={text}
        isOpen={saveOptionsOpen}
        onClose={() => setSaveOptionsOpen(false)}
      />
    </>
  );
}