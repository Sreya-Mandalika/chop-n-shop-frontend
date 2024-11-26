import React, { useState } from 'react';
import axios from 'axios';
import DataDisplay from './DataDisplay';

function Recipes() {
  const [generateSearchTerm, setGenerateSearchTerm] = useState('');
  const [searchSearchTerm, setSearchSearchTerm] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');
  const [newRecipeData, setNewRecipeData] = useState(null); // Store generated recipe data
  const [existingRecipeData, setExistingRecipeData] = useState(null); // Store existing recipe data
  const [error, setError] = useState(null); // Store error messages

  // Handle generating a new recipe (using a prompt from the user)
  const handleGenerateRecipeSubmit = async () => {
    if (generateSearchTerm.trim()) {
      setSubmittedTerm(generateSearchTerm); // Save the submitted search term

      try {
        const response = await axios.post('http://localhost:8000/generate_recipe', { prompt: generateSearchTerm });
        setNewRecipeData(response.data); // Store generated recipe data
        setExistingRecipeData(null); // Clear existing recipe data
        setError(null); // Clear any previous error
      } catch (err) {
        setError('Error generating new recipe');
        setNewRecipeData(null); // Clear previous data if error occurs
      }
    }
  };

  // Handle searching for an existing recipe (by recipe name)
  const handleSearchRecipeSubmit = async () => {
    if (searchSearchTerm.trim()) {
      setSubmittedTerm(searchSearchTerm); // Save the submitted search term

      try {
        const response = await axios.get(`http://localhost:8000/recipes/${searchSearchTerm}/`);
        setExistingRecipeData(response.data); // Store fetched recipe data
        setNewRecipeData(null); // Clear generated recipe data
        setError(null); // Clear any previous error
      } catch (err) {
        setError('Recipe not found or error occurred');
        setExistingRecipeData(null); // Clear previous data if error occurs
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Recipe Generator & Search</h1>
        <p className="text-lg text-gray-600">
          Generate a new recipe or search for an existing one!
        </p>
      </div>

      {/* Generate New Recipe Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full">
        <input
          type="text"
          placeholder="Generate a new recipe (e.g., chocolate cake, vegan tacos...)"
          value={generateSearchTerm}
          onChange={(e) => setGenerateSearchTerm(e.target.value)} // Update search term on change
          className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleGenerateRecipeSubmit} // Handle generate new recipe submit
          className="w-full sm:w-1/3 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Generate Recipe
        </button>
      </div>

      {/* Search Existing Recipe Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full">
        <input
          type="text"
          placeholder="Search for an existing recipe"
          value={searchSearchTerm}
          onChange={(e) => setSearchSearchTerm(e.target.value)} // Update search term on change
          className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearchRecipeSubmit} // Handle search existing recipe submit
          className="w-full sm:w-1/3 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Search Recipe
        </button>
      </div>

      {/* Display Error Message */}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      {/* Display New Recipe (Generated) */}
      {newRecipeData && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{newRecipeData.name}</h2>
          <p className="text-lg text-gray-700">{newRecipeData.instructions}</p>
          {/* Display more details of the new generated recipe */}
        </div>
      )}

      {/* Display Existing Recipe (Fetched from DB) */}
      {existingRecipeData && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{existingRecipeData.name}</h2>
          <p className="text-lg text-gray-700">{existingRecipeData.instructions}</p>
          {/* Display more details of the existing recipe */}
        </div>
      )}

      {/* Optionally, show the result using DataDisplay if necessary */}
      {submittedTerm && !newRecipeData && !existingRecipeData && <DataDisplay searchTerm={submittedTerm} />}
    </div>
  );
}

export default Recipes;
