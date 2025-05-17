import React from 'react';
import { Routes, Route } from 'react-router-dom';

const PTEPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">PTE Academic Preparation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Speaking & Writing</h2>
          <p className="text-gray-600 mb-4">Practice speaking and writing tasks with our comprehensive PTE exercises.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Reading</h2>
          <p className="text-gray-600 mb-4">Improve your reading skills with PTE-style materials and questions.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Listening</h2>
          <p className="text-gray-600 mb-4">Enhance your listening comprehension with targeted practice.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Tips</h2>
          <p className="text-gray-600 mb-4">Learn essential strategies and tips for PTE Academic success.</p>
        </div>
      </div>
    </div>
  );
};

export default PTEPage;