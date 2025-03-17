import React, { useState } from 'react';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { readFileContent } from '../utils/fileUtils';

interface FileUploadProps {
  onFileContent: (content: string) => void;
  buttonText?: React.ReactNode | string;
}

export default function FileUpload({ onFileContent, buttonText = "Upload File" }: FileUploadProps) {
  const [showButton, setShowButton] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show loading state
    setIsLoading(true);
    
    try {
      console.log(`Starting to process file: ${file.name}, type: ${file.type}, size: ${file.size} bytes`);
      
      // Validate file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (!fileExt || !['txt', 'docx', 'doc', 'pdf'].includes(fileExt)) {
        throw new Error(`Unsupported file format: ${fileExt || 'unknown'}`);
      }
      
      // Process the file content
      const text = await readFileContent(file);
      
      // Validate the extracted text
      if (!text || text.trim() === '') {
        throw new Error(`No text content could be extracted from the file. The file might be empty or corrupted.`);
      }
      
      console.log(`Successfully extracted ${text.length} characters from ${file.name}`);
      
      // Pass the content to the parent component
      onFileContent(text);
      setShowButton(false);
      toast.success(`File "${file.name}" uploaded successfully`);
    } catch (error) {
      console.error('File upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Error reading file');
    } finally {
      // Reset loading state
      setIsLoading(false);
      
      // Reset the input
      event.target.value = '';
    }
  };

  return (
    <div className="inline-block">
      {showButton && (
      <label className={`inline-flex items-center px-6 py-2 text-base font-medium text-white bg-[#4F46E5] rounded-md transition-all duration-200 transform hover:scale-105 hover:opacity-90 cursor-pointer ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}>
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : typeof buttonText === 'string' ? (
          <>
            <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
            {buttonText}
          </>
        ) : (
          buttonText
        )}
        <input
          type="file"
          className="hidden"
          accept=".txt,.docx,.doc,.pdf,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileUpload}
          disabled={isLoading}
        />
      </label>
      )}
    </div>
  );
}
