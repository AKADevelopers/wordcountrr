export function capitalizeFirstLetterOfSentences(text: string): string {
  // Split text into sentences using regex that accounts for multiple sentence endings
  return text.replace(/(^\w|[.!?]\s+\w)/g, letter => letter.toUpperCase());
}