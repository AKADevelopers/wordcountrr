export interface TextStats {
  wordCount: number;
  characterCount: number;
  characterNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number;
  speakingTime: number;
  readingLevel: string;
}

export function analyzeText(text: string): TextStats {
  if (!text.trim()) {
    return {
      wordCount: 0,
      characterCount: 0,
      characterNoSpaces: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      readingTime: 0,
      speakingTime: 0,
      readingLevel: 'N/A'
    };
  }

  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  const readingTime = Math.max(1, Math.ceil(words.length / 200));
  const speakingTime = Math.max(1, Math.ceil(words.length / 130));

  return {
    wordCount: words.length,
    characterCount: text.length,
    characterNoSpaces: charactersNoSpaces,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    readingTime,
    speakingTime,
    readingLevel: calculateReadingLevel(text)
  };
}

function calculateReadingLevel(text: string): string {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  
  if (words.length === 0 || sentences.length === 0) return 'N/A';
  
  const wordsPerSentence = words.length / sentences.length;
  
  if (wordsPerSentence > 20) return 'College Graduate';
  if (wordsPerSentence > 15) return 'College';
  if (wordsPerSentence > 10) return 'High School';
  return 'Elementary';
}