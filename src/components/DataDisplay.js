import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataDisplay({ searchTerm }) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make POST request to generate a recipe
      const response = await axios.post('http://localhost:8000/generate_recipe/', {
        recipe_prompt: searchTerm, // Send user prompt
      });

      const generatedRecipe = response.data.recipe;
      if (!generatedRecipe) {
        setError("Failed to generate recipe. Please try again.");
      } else {
        setRecipe(generatedRecipe); // Set the generated recipe
      }
    } catch (err) {
      setError("Error generating recipe. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      generateRecipe();
    }
  }, [searchTerm]);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-4">
      <h1 className="text-xl font-bold mb-4">Your Generated Recipe</h1>

      {loading && <p className="text-gray-500">Generating recipe...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !recipe && !error && (
        <p className="text-gray-500">No recipe found for "{searchTerm}".</p>
      )}

      {recipe && (
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            {recipe.name || "Unnamed Recipe"}
          </h2>
          <p className="text-gray-600 mb-4">Recipe ID: {recipe._id}</p>

          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            )) || <li className="text-gray-500">No ingredients listed.</li>}
          </ul>

          <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1">
            {recipe.instructions?.map((instruction, index) => (
              <li key={index} className="text-gray-700">
                {instruction}
              </li>
            )) || <li className="text-gray-500">No instructions provided.</li>}
          </ol>
        </div>
      )}
    </div>
  );
}

export default DataDisplay;
