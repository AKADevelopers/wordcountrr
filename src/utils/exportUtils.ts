import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';

function sanitizeText(text: string): string {
  // Remove HTML tags and decode common entities
  const entityMap: { [key: string]: string } = {
    '<': '<',
    '>': '>',
    '&': '&', 
    '"': '"',
    '&#39;': "'",
    '&nbsp;': ' '
  };

  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&(lt|gt|amp|quot|#39|nbsp);/g, (_, entity) => entityMap[`&${entity};`]);
}

export async function exportToTxt(text: string, filename: string): Promise<void> {
  text = sanitizeText(text);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${filename}.txt`);
}

export async function exportToDocx(text: string, filename: string): Promise<void> {
  text = sanitizeText(text);
  const paragraphs = text.split(/\r?\n/).map(para => 
    new Paragraph({
      children: [new TextRun({ text: para || ' ' })],
      spacing: { after: 200 }
    })
  );

  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
}

export async function exportToPdf(text: string, filename: string): Promise<void> {
  text = sanitizeText(text);
  const doc = new jsPDF();
  
  doc.setFont('helvetica');
  doc.setFontSize(12);
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  
  let yPosition = margin;
  const lineHeight = 7;

  text.split(/\r?\n/).forEach(paragraph => {
    if (yPosition > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      yPosition = margin;
    }

    // Split paragraph into individual lines and handle wrapping
    paragraph.split('\n').forEach(line => {
      const lines = doc.splitTextToSize(line, maxWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * lineHeight + 5;
      
      if (yPosition > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        yPosition = margin;
      }
    });
  });
  
  const blob = doc.output('blob');
  saveAs(blob, `${filename}.pdf`);
}
