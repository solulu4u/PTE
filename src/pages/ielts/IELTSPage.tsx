import React from 'react';
import { Routes, Route } from 'react-router-dom';

const IELTSPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">IELTS Preparation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Listening</h2>
          <p className="text-gray-600 mb-4">Practice your listening skills with our comprehensive IELTS listening exercises.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Reading</h2>
          <p className="text-gray-600 mb-4">Improve your reading comprehension with IELTS-style passages and questions.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Writing</h2>
          <p className="text-gray-600 mb-4">Master IELTS writing tasks with guided practice and expert tips.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Speaking</h2>
          <p className="text-gray-600 mb-4">Enhance your speaking abilities with structured practice sessions.</p>
        </div>
      </div>
    </div>
  );
};

export default IELTSPage;