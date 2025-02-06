import { extractPdfText } from './pdfUtils';

export async function readFileContent(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'txt':
      return await file.text();
      
    case 'docx': {
      const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
      const docxContent = await extractDocxText(arrayBuffer);
      return docxContent;
    }

    case 'pdf': {
      const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
      return await extractPdfText(arrayBuffer);
    }

    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
}

async function extractDocxText(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.replace(/<[^>]+>/g, ''); // Remove any remaining HTML tags
  } catch (error) {
    console.error('Error reading DOCX file:', error);
    throw new Error('Failed to read DOCX file');
  }
}
