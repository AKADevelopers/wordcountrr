import { extractPdfText } from './pdfUtils';

/**
 * Reads text content from a text file
 * @param file The text file to read
 * @returns Promise with the text content
 */
async function extractTxtText(file: File): Promise<string> {
  try {
    // Use FileReader instead of file.text() for better browser compatibility
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read text file: Empty content'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading text file'));
      };
      
      reader.readAsText(file);
    });
  } catch (error) {
    console.error('Error reading TXT file:', error);
    throw new Error('Failed to read text file. Please check if the file is valid.');
  }
}

/**
 * Extracts text from a DOCX file
 * @param arrayBuffer The file content as ArrayBuffer
 * @returns Promise with the extracted text
 */
async function extractDocxText(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.replace(/<[^>]+>/g, ''); // Remove any remaining HTML tags
  } catch (error) {
    console.error('Error reading DOCX file:', error);
    throw new Error('Failed to read DOCX file. Please make sure the file is not corrupted.');
  }
}

/**
 * Main function to read content from different file types
 * @param file The file to read
 * @returns Promise with the text content
 */
export async function readFileContent(file: File): Promise<string> {
  // Get file extension and convert to lowercase
  const fileName = file.name || '';
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  console.log(`Processing file: ${fileName} with extension: ${extension}`);
  
  try {
    // Validate file size (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds the maximum limit of 10MB`);
    }
    
    // Process based on file extension
    switch (extension) {
      case 'txt':
        return await extractTxtText(file);
        
      case 'docx':
      case 'doc': {
        const arrayBuffer = await file.arrayBuffer();
        return await extractDocxText(arrayBuffer);
      }
      
      case 'pdf': {
        const arrayBuffer = await file.arrayBuffer();
        return await extractPdfText(arrayBuffer);
      }
      
      default:
        throw new Error(`Unsupported file format: ${extension || 'unknown'}`);
    }
  } catch (error) {
    console.error('Error reading file:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unknown error occurred while reading file');
    }
  }
}
