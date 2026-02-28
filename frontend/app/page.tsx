import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Digital Agri-Hub
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Enterprise Supply Chain Intelligence for the Agricultural Sector. 
          Real-time commodity pricing and verified supplier matching.
        </p>
        <Link 
          href="/dashboard" 
          className="inline-block bg-green-700 text-white font-semibold px-8 py-3 rounded-md hover:bg-green-800 transition-colors shadow-sm"
        >
          Access Executive Portal
        </Link>
      </div>
    </div>
  );
}