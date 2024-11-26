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

  // Helper function to format ingredients
  const formatIngredient = (ingredient) => {
    if (typeof ingredient === 'object') {
      return `${ingredient.quantity} ${ingredient.name}${ingredient.preparation ? ` (${ingredient.preparation})` : ''}`;
    }
    return ingredient;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mt-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Your Generated Recipe</h1>

      {loading && <p className="text-center text-gray-500">Generating recipe...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !recipe && !error && (
        <p className="text-center text-gray-500">No recipe found for "{searchTerm}".</p>
      )}

      {recipe && (
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">{recipe.name || "Unnamed Recipe"}</h2>

          {/* Ingredients Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Ingredients:</h3>
            <ul className="list-disc list-inside space-y-2 pl-4">
              {recipe.ingredients?.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{formatIngredient(ingredient)}</li>
                ))
              ) : (
                <li className="text-gray-500">No ingredients listed.</li>
              )}
            </ul>
          </div>

          {/* Instructions Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              {recipe.instructions?.length > 0 ? (
                recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">{instruction}</li>
                ))
              ) : (
                <li className="text-gray-500">No instructions provided.</li>
              )}
            </ol>
          </div>

          {/* Optional Prep/Cook Time */}
          <div className="mt-4 text-gray-600">
            <p><strong>Prep Time:</strong> {recipe.prep_time}</p>
            <p><strong>Cook Time:</strong> {recipe.cook_time}</p>
            <p><strong>Total Time:</strong> {recipe.total_time}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataDisplay;
