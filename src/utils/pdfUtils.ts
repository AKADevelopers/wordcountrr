import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@latest/build/pdf.worker.min.js';

export async function extractPdfText(arrayBuffer: ArrayBuffer): Promise<string> {
  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
    useSystemFonts: true,
    disableFontFace: true
  }).promise;
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => (item as any).str)
      .join(' ')
      .replace(/\s+/g, ' ');
    fullText += pageText + '\n';
  }

  return fullText.trim();
}
