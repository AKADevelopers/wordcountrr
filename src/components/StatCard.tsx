import React, { ReactNode } from 'react';

interface StatCardProps {
  title: ReactNode;
  value: string | number;
  description?: string;
}

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}