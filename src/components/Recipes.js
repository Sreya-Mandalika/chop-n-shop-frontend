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
    <div className="p-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Recipe Generator</h1>
        <p className="text-gray-600">
          Enter what kind of recipe you'd like to make, and we'll generate one for you!
        </p>
      </div>

      {/* Input for Recipe Prompt */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter a recipe idea (e.g., chocolate cake)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearchSubmit}
          className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
