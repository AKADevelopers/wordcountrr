import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

// Set the worker source directly to a CDN
// This is the most reliable approach for Vite projects
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js`;

// Log configuration for debugging
console.log('PDF.js worker source set to CDN');

/**
 * Extracts text content from a PDF file
 * @param arrayBuffer The PDF file content as ArrayBuffer
 * @returns Promise with the extracted text
 */
export async function extractPdfText(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    // Validate input
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      throw new Error('Invalid PDF: Empty file content');
    }
    
    console.log(`Loading PDF document, size: ${arrayBuffer.byteLength} bytes`);
    
    // Load the PDF document with minimal configuration
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      disableFontFace: true,
      useSystemFonts: false,
    });
    
    const pdf = await loadingTask.promise;
    console.log(`PDF loaded successfully with ${pdf.numPages} pages`);
    
    if (pdf.numPages === 0) {
      return '';
    }
    
    // Extract text from all pages
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        console.log(`Processing page ${i} of ${pdf.numPages}`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Extract text from each item
        const pageText = textContent.items
          .map((item: any) => {
            if ('str' in item) {
              return item.str;
            }
            return '';
          })
          .join(' ');
          
        fullText += pageText + '\n';
      } catch (pageError) {
        console.error(`Error extracting text from page ${i}:`, pageError);
        // Continue with next page instead of failing completely
      }
    }
    
    // Clean up
    await pdf.destroy();
    
    return fullText.trim();
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error(`Failed to extract text from PDF file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
