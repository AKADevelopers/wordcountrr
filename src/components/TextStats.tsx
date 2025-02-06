import React from 'react';
import StatCard from './StatCard';
import { TextStats as TextStatsType } from '../utils/textAnalyzer';

interface TextStatsProps {
  stats: TextStatsType;
}

export default function TextStats({ stats }: TextStatsProps) {
  return (
    <>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        <StatCard 
          title={<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Words</span>}
          value={stats.wordCount}
          description="Total word count" 
        />
        <StatCard 
          title={<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Chars</span>}
          value={stats.characterCount}
          description="Including spaces" 
        />
        <StatCard 
          title={<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">No Spaces</span>}
          value={stats.characterNoSpaces}
          description="Excluding spaces" 
        />
        <StatCard 
          title={<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sentences</span>}
          value={stats.sentenceCount}
          description="Number of sentences" 
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
        <StatCard 
          title={<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Reading</span>}
          value={`${stats.readingTime} min`}
          description="Based on 200 words/min" 
        />
        <StatCard 
          title={<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Speaking</span>}
          value={`${stats.speakingTime} min`}
          description="Based on 130 words/min" 
        />
        <StatCard 
          title={<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Level</span>}
          value={stats.readingLevel}
          description="Based on complexity" 
        />
      </div>
    </>
  );
}