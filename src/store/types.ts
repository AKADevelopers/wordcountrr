export interface HistoryEntry {
  id: string;
  text: string;
  timestamp: number;
}

export interface TextState {
  history: HistoryEntry[];
  currentText: string;
  addToHistory: (text: string) => void;
  clearHistory: () => void;
  loadFromHistory: (text: string) => void;
  setText: (text: string) => void;
}