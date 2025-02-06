import React from 'react';
import { useTextStore } from '../store/textStore';
import HistoryItem from '../components/HistoryItem';
import toast from 'react-hot-toast';

export default function HistoryPage() {
  const { history, clearHistory } = useTextStore();

  const handleClearHistory = () => {
    clearHistory();
    toast.success('History cleared');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          <span className="text-yellow-500">Text</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> History</span>
        </h2>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-md transition-all duration-200 transform hover:scale-105"
          >
            Clear History
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No history yet</p>
          <p className="text-sm text-gray-400 mt-2">Your text history will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <HistoryItem key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}