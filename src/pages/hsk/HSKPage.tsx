import React from 'react';
import { Routes, Route } from 'react-router-dom';

const HSKPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">HSK Preparation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Vocabulary</h2>
          <p className="text-gray-600 mb-4">Master essential HSK vocabulary with our comprehensive word lists and exercises.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Grammar</h2>
          <p className="text-gray-600 mb-4">Practice Chinese grammar patterns required for your HSK level.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Reading</h2>
          <p className="text-gray-600 mb-4">Improve your Chinese reading comprehension with level-appropriate texts.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Listening</h2>
          <p className="text-gray-600 mb-4">Enhance your listening skills with HSK-style audio exercises.</p>
        </div>
      </div>
    </div>
  );
};

export default HSKPage;