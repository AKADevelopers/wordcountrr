import { useState } from 'react';

export function useTextHistory(initialText: string) {
  const [originalText, setOriginalText] = useState(initialText);
  const [currentText, setCurrentText] = useState(initialText);

  const updateText = (newText: string) => {
    if (newText !== currentText) {
      setOriginalText(currentText);
      setCurrentText(newText);
    }
  };

  const resetText = () => {
    setCurrentText(originalText);
    return originalText;
  };

  return {
    currentText,
    updateText,
    resetText
  };
}