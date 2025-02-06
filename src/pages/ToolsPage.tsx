import React, { useState } from 'react';

export default function ToolsPage() {
  const [text, setText] = useState('');
  
  const tools = [
    {
      name: 'Remove Extra Spaces',
      action: () => setText(text.replace(/\s+/g, ' ').trim()),
    },
    {
      name: 'Remove Line Breaks',
      action: () => setText(text.replace(/[\r\n]+/g, ' ').trim()),
    },
    {
      name: 'Remove Special Characters',
      action: () => setText(text.replace(/[^a-zA-Z0-9\s]/g, '')),
    },
    {
      name: 'Count Words',
      action: () => alert(`Word count: ${text.trim().split(/\s+/).filter(word => word.length > 0).length}`),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Text Tools</h2>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <textarea
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
            placeholder="Enter text to process..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.name}
                onClick={tool.action}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                {tool.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}