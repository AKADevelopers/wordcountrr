import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  DocumentArrowDownIcon,
  DocumentTextIcon,
  DocumentIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { exportToTxt, exportToDocx, exportToPdf } from '../utils/exportUtils';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';
import DOMPurify from 'dompurify';

interface SaveOptionsProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SaveOptions({ text, isOpen, onClose }: SaveOptionsProps) {
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async (format: 'txt' | 'docx' | 'pdf') => {
    try {
      setIsExporting(true);
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
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveToGoogleDrive = async () => {
    try {
      setIsExporting(true);
      
      // Show format selection dialog for Google Drive
      const format = await showGoogleDriveFormatDialog();
      if (!format) {
        setIsExporting(false);
        return; // User cancelled
      }
      
      // Create the file content based on the selected format
      const filename = `wordcountrr-text-${new Date().toISOString().slice(0, 10)}`;
      
      // Prepare file content based on format
      let fileContent: Blob;
      let mimeType: string;
      let fileExtension: string;
      
      // Sanitize the text
      const sanitizedText = DOMPurify.sanitize(text);
      
      switch (format) {
        case 'txt':
          fileContent = new Blob([sanitizedText], { type: 'text/plain;charset=utf-8' });
          mimeType = 'text/plain';
          fileExtension = 'txt';
          break;
        case 'docx':
          // Create DOCX document
          const paragraphs = sanitizedText.split(/\n/).map(line => {
            return new Paragraph({
              children: [new TextRun(line)]
            });
          });
          
          const doc = new Document({
            sections: [{
              properties: {},
              children: paragraphs
            }]
          });
          
          fileContent = await Packer.toBlob(doc);
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          fileExtension = 'docx';
          break;
        case 'pdf':
          // Create PDF document
          const pdfDoc = new jsPDF();
          
          // Split the text by line breaks to handle paragraphs
          const pdfParagraphs = sanitizedText.split(/\n/);
          
          // Set initial y position
          let y = 10;
          
          // Add each paragraph to the PDF
          pdfParagraphs.forEach(paragraph => {
            // Split long paragraphs to fit within page width
            const lines = pdfDoc.splitTextToSize(paragraph, 190);
            
            // Check if we need to add a new page
            if (y + lines.length * 7 > 280) {
              pdfDoc.addPage();
              y = 10;
            }
            
            // Add the lines to the PDF
            pdfDoc.text(lines, 10, y);
            
            // Update y position for the next paragraph
            y += lines.length * 7 + 3;
          });
          
          fileContent = pdfDoc.output('blob');
          mimeType = 'application/pdf';
          fileExtension = 'pdf';
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
      
      // Use Google Drive's direct upload URL with the proper file format
      const uploadToDrive = async () => {
        // Create a form for Google Drive upload
        const form = new FormData();
        form.append('file', fileContent, `${filename}.${fileExtension}`);
        
        // Create a Google Drive upload URL with the correct MIME type
        const googleDriveUploadUrl = `https://www.googleapis.com/upload/drive/v3/files?uploadType=media`;
        
        // Open Google Drive in a new tab
        const driveWindow = window.open('https://drive.google.com/drive/my-drive', '_blank');
        
        // Create a temporary link element to trigger the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(fileContent);
        a.download = `${filename}.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(a.href);
        }, 100);
        
        toast.success(`File downloaded as ${fileExtension.toUpperCase()}. Please upload it to your Google Drive.`);
      };
      
      await uploadToDrive();
      onClose();
    } catch (error) {
      console.error('Google Drive export error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save to Google Drive');
    } finally {
      setIsExporting(false);
    }
  };
  
  // Helper function to show a format selection dialog for Google Drive
  const showGoogleDriveFormatDialog = (): Promise<'txt' | 'docx' | 'pdf' | null> => {
    return new Promise((resolve) => {
      // Create format options
      const formats = [
        { id: 'txt', name: 'Text File (.txt)' },
        { id: 'docx', name: 'Word Document (.docx)' },
        { id: 'pdf', name: 'PDF Document (.pdf)' }
      ];
      
      // Create dialog element
      const dialogContainer = document.createElement('div');
      dialogContainer.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
      
      // Create dialog content
      const dialogContent = document.createElement('div');
      dialogContent.className = 'bg-white rounded-xl p-6 w-full max-w-md';
      
      // Create title
      const title = document.createElement('h3');
      title.className = 'text-xl font-semibold text-gray-900 mb-4';
      title.textContent = 'Select Format for Google Drive';
      
      // Create format options
      const formatList = document.createElement('div');
      formatList.className = 'space-y-3';
      
      formats.forEach(format => {
        const button = document.createElement('button');
        button.className = 'w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-all duration-200';
        button.innerHTML = `<span class="text-gray-700">${format.name}</span>`;
        button.onclick = () => {
          document.body.removeChild(dialogContainer);
          resolve(format.id as 'txt' | 'docx' | 'pdf');
        };
        formatList.appendChild(button);
      });
      
      // Create cancel button
      const cancelButton = document.createElement('button');
      cancelButton.className = 'mt-4 w-full p-2 text-sm text-gray-600 hover:text-gray-900';
      cancelButton.textContent = 'Cancel';
      cancelButton.onclick = () => {
        document.body.removeChild(dialogContainer);
        resolve(null);
      };
      
      // Assemble dialog
      dialogContent.appendChild(title);
      dialogContent.appendChild(formatList);
      dialogContent.appendChild(cancelButton);
      dialogContainer.appendChild(dialogContent);
      
      // Add to document
      document.body.appendChild(dialogContainer);
    });
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
                className={`w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${isExporting ? 'opacity-70 pointer-events-none' : ''}`}
                disabled={isExporting}
              >
                <Icon className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-700">{label}</span>
              </button>
            ))}

            <button
              onClick={handleSaveToGoogleDrive}
              className={`w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${isExporting ? 'opacity-70 pointer-events-none' : ''}`}
              disabled={isExporting}
            >
              <CloudArrowUpIcon className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-700">Save to Google Drive</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full p-2 text-sm text-gray-600 hover:text-gray-900"
            disabled={isExporting}
          >
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}