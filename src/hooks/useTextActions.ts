import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { capitalizeFirstLetterOfSentences } from '../utils/textUtils';

export function useTextActions(text: string, onTextChange: (text: string) => void) {
  const checkEmptyText = useCallback((): boolean => {
    if (!text.trim()) {
      toast.error('Please enter some text first');
      return true;
    }
    return false;
  }, [text]);

  const handleClear = useCallback(() => {
    if (!text.trim()) {
      toast.error('Nothing to clear');
      return;
    }
    onTextChange('');
    toast.success('Text cleared');
  }, [text, onTextChange]);

  const handleCopy = useCallback(async () => {
    if (checkEmptyText()) return;
    
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  }, [text, checkEmptyText]);

  const handleUpperCase = useCallback(() => {
    if (checkEmptyText()) return;
    onTextChange(text.toUpperCase());
    toast.success('Text converted to uppercase');
  }, [text, onTextChange, checkEmptyText]);

  const handleLowerCase = useCallback(() => {
    if (checkEmptyText()) return;
    onTextChange(text.toLowerCase());
    toast.success('Text converted to lowercase');
  }, [text, onTextChange, checkEmptyText]);

  const handleTitleCase = useCallback(() => {
    if (checkEmptyText()) return;
    const newText = text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    onTextChange(newText);
    toast.success('Text converted to title case');
  }, [text, onTextChange, checkEmptyText]);

  const handleCapitalizeSentences = useCallback(() => {
    if (checkEmptyText()) return;
    const newText = capitalizeFirstLetterOfSentences(text);
    onTextChange(newText);
    toast.success('Sentences capitalized');
  }, [text, onTextChange, checkEmptyText]);

  const handleRemoveExtraSpaces = useCallback(() => {
    if (checkEmptyText()) return;
    const newText = text.replace(/\s+/g, ' ').trim();
    onTextChange(newText);
    toast.success('Extra spaces removed');
  }, [text, onTextChange, checkEmptyText]);

  const handleRemoveLineBreaks = useCallback(() => {
    if (checkEmptyText()) return;
    const newText = text.replace(/[\r\n]+/g, ' ').trim();
    onTextChange(newText);
    toast.success('Line breaks removed');
  }, [text, onTextChange, checkEmptyText]);

  const handleRemoveSpecialChars = useCallback(() => {
    if (checkEmptyText()) return;
    const newText = text.replace(/[^a-zA-Z0-9\s]/g, '');
    onTextChange(newText);
    toast.success('Special characters removed');
  }, [text, onTextChange, checkEmptyText]);

  return {
    handleClear,
    handleCopy,
    handleUpperCase,
    handleLowerCase,
    handleTitleCase,
    handleCapitalizeSentences,
    handleRemoveExtraSpaces,
    handleRemoveLineBreaks,
    handleRemoveSpecialChars,
  };
}