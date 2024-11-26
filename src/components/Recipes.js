import React, { useState } from 'react';
import DataDisplay from './DataDisplay';

function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      setSubmittedTerm(searchTerm); // Pass search term to DataDisplay
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Recipe Generator</h1>
        <p className="text-lg text-gray-600">
          Enter a recipe idea, and we’ll generate a unique recipe for you!
        </p>
      </div>

      {/* Input for Recipe Prompt */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full">
        <input
          type="text"
          placeholder="e.g., chocolate cake, vegan tacos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearchSubmit}
          className="w-full sm:w-1/3 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Generate Recipe
        </button>
      </div>

      {/* Display the generated recipe */}
      {submittedTerm && <DataDisplay searchTerm={submittedTerm} />}
    </div>
  );
}

export default Recipes;
