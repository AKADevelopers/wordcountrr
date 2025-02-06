import React from 'react';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { readFileContent } from '../utils/fileUtils';

interface FileUploadProps {
  onFileContent: (content: string) => void;
  buttonText?: React.ReactNode | string;
}

export default function FileUpload({ onFileContent, buttonText = "Upload File" }: FileUploadProps) {
  const [showButton, setShowButton] = React.useState(true);
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await readFileContent(file);
      onFileContent(text);
      setShowButton(false);
      toast.success(`File "${file.name}" uploaded successfully`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error reading file');
    }
    
    // Reset the input
    event.target.value = '';
  };

  return (
    <div className="inline-block">
      {showButton && (
      <label className="inline-flex items-center px-6 py-2 text-base font-medium text-white bg-[#4F46E5] rounded-md transition-all duration-200 transform hover:scale-105 hover:opacity-90 cursor-pointer">
        {typeof buttonText === 'string' ? (
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
          accept=".txt,.docx,.doc,.pdf,application/pdf"
          onChange={handleFileUpload}
        />
      </label>
      )}
    </div>
  );
}
