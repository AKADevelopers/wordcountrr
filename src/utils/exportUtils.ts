import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';
import DOMPurify from 'dompurify';

// Type definitions for Google API
declare global {
  interface Window {
    gapi: any;
  }
}

/**
 * Sanitizes text to prevent XSS attacks
 * @param text The text to sanitize
 * @returns The sanitized text
 */
function sanitizeText(text: string): string {
  return DOMPurify.sanitize(text);
}

/**
 * Sanitizes a filename to ensure it's valid
 * @param filename The filename to sanitize
 * @returns The sanitized filename
 */
function sanitizeFilename(filename: string): string {
  return filename.replace(/[/\\?%*:|"<>]/g, '-');
}

/**
 * Exports text content to a TXT file
 * @param text The text content to export
 * @param filename The name of the file (without extension)
 */
export async function exportToTxt(text: string, filename: string): Promise<void> {
  // Sanitize the text to prevent XSS
  const sanitizedText = sanitizeText(text);
  const safeFilename = sanitizeFilename(filename);
  
  // Create a blob with the text content
  const blob = new Blob([sanitizedText], { type: 'text/plain;charset=utf-8' });
  
  // Save the file
  saveAs(blob, `${safeFilename}.txt`);
}

/**
 * Exports text content to a DOCX file
 * @param text The text content to export
 * @param filename The name of the file (without extension)
 */
export async function exportToDocx(text: string, filename: string): Promise<void> {
  // Sanitize the text to prevent XSS
  const sanitizedText = sanitizeText(text);
  const safeFilename = sanitizeFilename(filename);
  
  // Split the text by line breaks to create paragraphs
  const paragraphs = sanitizedText.split(/\n/).map(line => {
    return new Paragraph({
      children: [new TextRun(line)]
    });
  });
  
  // Create a new document with the paragraphs
  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs
    }]
  });
  
  // Generate the document as a blob
  const blob = await Packer.toBlob(doc);
  
  // Save the file
  saveAs(blob, `${safeFilename}.docx`);
}

/**
 * Exports text content to a PDF file
 * @param text The text content to export
 * @param filename The name of the file (without extension)
 */
export async function exportToPdf(text: string, filename: string): Promise<void> {
  // Sanitize the text to prevent XSS
  const sanitizedText = sanitizeText(text);
  const safeFilename = sanitizeFilename(filename);
  
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Split the text by line breaks to handle paragraphs
  const paragraphs = sanitizedText.split(/\n/);
  
  // Set initial y position
  let y = 10;
  
  // Add each paragraph to the PDF
  paragraphs.forEach(paragraph => {
    // Split long paragraphs to fit within page width
    const lines = doc.splitTextToSize(paragraph, 190);
    
    // Check if we need to add a new page
    if (y + lines.length * 7 > 280) {
      doc.addPage();
      y = 10;
    }
    
    // Add the lines to the PDF
    doc.text(lines, 10, y);
    
    // Update y position for the next paragraph
    y += lines.length * 7 + 3;
  });
  
  // Save the PDF
  doc.save(`${safeFilename}.pdf`);
}
