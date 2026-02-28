import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-green-800">
              Agri-Hub
            </Link>
          </div>

          {/* Core Navigation Links */}
          <div className="flex space-x-4">
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/login" 
              className="bg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Client Login
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};