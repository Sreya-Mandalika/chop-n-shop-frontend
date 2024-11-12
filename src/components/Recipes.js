import React, { useState } from 'react';
import DataDisplay from './DataDisplay'; // Make sure to import DataDisplay
function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchSubmit = () => {
    // You can handle extra search logic if needed
  };
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Recipe Collection</h1>
        <p className="text-gray-600">
          Browse your saved recipes, find cooking inspiration, and easily add ingredients to your shopping list.
        </p>
      </div>
      {/* Search Input and Button */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearchSubmit}
          className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {/* Conditionally render DataDisplay component */}
      {searchTerm && <DataDisplay searchTerm={searchTerm} />}
    </div>
  );
}
export default Recipes;