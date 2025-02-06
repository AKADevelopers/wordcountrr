import { extractPdfText } from '../utils/pdfUtils';
import JSZip from 'jszip';
import * as mammoth from 'mammoth';

export interface FileProcessingResult {
  success: boolean;
  text: string;
  error?: string;
}

export async function processFile(file: File): Promise<FileProcessingResult> {
  try {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB limit');
    }

    // Validate file type
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['txt', 'docx', 'doc', 'pdf'].includes(extension || '')) {
      throw new Error('Unsupported file format. Please upload TXT, DOCX, DOC, or PDF files only.');
    }

    const arrayBuffer = await file.arrayBuffer();
    let text = '';

    switch (extension) {
      case 'txt':
        text = await file.text();
        break;

      case 'docx':
      case 'doc':
        const result = await mammoth.convertToHtml({ arrayBuffer });
        if (result.value) {
          text = result.value
            // Preserve basic formatting
            .replace(/<p>/g, '\n<p>')
            .replace(/<h\d>/g, '\n<h>')
            .replace(/<br>/g, '\n');
        }
        // Add error messages from mammoth if any
        if (result.messages.length > 0) {
          text += '\n\nConversion notes:\n' + result.messages.join('\n');
        }
        break;

      case 'pdf':
        text = await extractPdfText(arrayBuffer);
        break;

      default:
        throw new Error('Unsupported file format');
    }

    return { success: true, text: text.trim() };
  } catch (error) {
    console.error('File processing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process file';
    return { success: false, text: '', error: errorMessage };
  }
}
