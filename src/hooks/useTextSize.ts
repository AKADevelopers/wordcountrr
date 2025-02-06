import { useState } from 'react';

export function useTextSize(initialSize = 16) {
  const [fontSize, setFontSize] = useState(initialSize);

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24)); // Max size 24px
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12)); // Min size 12px
  };

  const resetFontSize = () => {
    setFontSize(initialSize);
  };

  return {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    style: { fontSize: `${fontSize}px` }
  };
}