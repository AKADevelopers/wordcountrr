import { extractPdfText } from '../utils/pdfUtils';
import JSZip from 'jszip';
import * as mammoth from 'mammoth';

export interface FileProcessingResult {
  success: boolean;
  text: string;
  error?: string;
}

const ALLOWED_MIME_TYPES = {
  'text/plain': ['txt'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  'application/msword': ['doc'],
  'application/pdf': ['pdf']
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function processFile(file: File): Promise<FileProcessingResult> {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
    }

    // Validate MIME type and extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type.toLowerCase();
    
    const isValidMimeType = Object.entries(ALLOWED_MIME_TYPES).some(([allowedMime, extensions]) => 
      mimeType === allowedMime && extension && extensions.includes(extension)
    );

    if (!isValidMimeType) {
      throw new Error('Invalid file type. Please upload TXT, DOCX, DOC, or PDF files only.');
    }

    const arrayBuffer = await file.arrayBuffer();
    let text = '';

    switch (extension) {
      case 'txt':
        const decoder = new TextDecoder('utf-8');
        text = decoder.decode(arrayBuffer);
        break;

      case 'docx':
      case 'doc':
        const result = await mammoth.convertToHtml({ arrayBuffer });
        if (result.value) {
          text = result.value
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove any script tags
            .replace(/<[^>]+>/g, '\n') // Convert HTML tags to newlines
            .replace(/&[^;]+;/g, ' '); // Convert HTML entities to spaces
        }
        break;

      case 'pdf':
        text = await extractPdfText(arrayBuffer);
        break;

      default:
        throw new Error('Unsupported file format');
    }

    // Validate extracted text
    if (!text || text.trim().length === 0) {
      throw new Error('No text content could be extracted from the file');
    }

    return { success: true, text: text.trim() };
  } catch (error) {
    return {
      success: false,
      text: '',
      error: error instanceof Error ? error.message : 'Failed to process file'
    };
  }
}
