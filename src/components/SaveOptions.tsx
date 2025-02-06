import React from 'react';
import { Dialog } from '@headlessui/react';
import {
  DocumentArrowDownIcon,
  DocumentTextIcon,
  DocumentIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { exportToTxt, exportToDocx, exportToPdf } from '../utils/exportUtils';

interface SaveOptionsProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SaveOptions({ text, isOpen, onClose }: SaveOptionsProps) {
  const handleExport = async (format: 'txt' | 'docx' | 'pdf') => {
    try {
      const filename = `text-${new Date().toISOString().slice(0, 10)}`;
      
      switch (format) {
        case 'txt':
          await exportToTxt(text, filename);
          break;
        case 'docx':
          await exportToDocx(text, filename);
          break;
        case 'pdf':
          await exportToPdf(text, filename);
          break;
      }
      
      toast.success(`File saved as ${format.toUpperCase()}`);
      onClose();
    } catch (error) {
      toast.error('Failed to save file');
    }
  };

  const handleSaveToGoogleDrive = async () => {
    toast.error('Google Drive integration coming soon!');
  };

  const exportOptions = [
    { format: 'txt', label: 'Text File (.txt)', icon: DocumentTextIcon },
    { format: 'docx', label: 'Word Document (.docx)', icon: DocumentIcon },
    { format: 'pdf', label: 'PDF Document (.pdf)', icon: DocumentArrowDownIcon },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
            Export Options
          </Dialog.Title>

          <div className="space-y-3">
            {exportOptions.map(({ format, label, icon: Icon }) => (
              <button
                key={format}
                onClick={() => handleExport(format as 'txt' | 'docx' | 'pdf')}
                className="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Icon className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-700">{label}</span>
              </button>
            ))}

            <button
              onClick={handleSaveToGoogleDrive}
              className="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <CloudArrowUpIcon className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-700">Save to Google Drive</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full p-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}