import React from 'react';
import { HistoryEntry } from '../types/history';
import { useTextStore } from '../store/textStore';
import { analyzeText } from '../utils/textAnalyzer';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface HistoryItemProps {
  entry: HistoryEntry;
}

export default function HistoryItem({ entry }: HistoryItemProps) {
  const stats = analyzeText(entry.text);
  const { loadFromHistory } = useTextStore();
  const navigate = useNavigate();

  const handleLoad = () => {
    loadFromHistory(entry.text);
    toast.success('Text loaded from history');
    navigate('/'); // Navigate to the main editor page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01]">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
          {new Date(entry.timestamp).toLocaleString()}
        </span>
        <button
          onClick={handleLoad}
          className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md transition-all duration-200 transform hover:scale-105"
        >
          Load
        </button>
      </div>
      <p className="text-gray-700 whitespace-pre-wrap mb-4">
        {entry.text.length > 200
          ? `${entry.text.slice(0, 200)}...`
          : entry.text}
      </p>
      <div className="flex gap-4 text-sm">
        <span className="text-yellow-500">
          Words: {stats.wordCount}
        </span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Characters: {stats.characterCount}
        </span>
      </div>
    </div>
  );
}