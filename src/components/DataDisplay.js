import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataDisplay({ searchTerm }) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8000/recipes/${searchTerm}`);
      setRecipe(response.data);
    } catch (err) {
      setError("Recipe not found");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchRecipe(); 
    }
  }, [searchTerm]);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-4">
      <h1 className="text-xl font-bold mb-4">Recipe Search</h1>

      {loading && <p className="text-gray-500">Loading recipe...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !recipe && !error && (
        <p className="text-gray-500">No recipe found for "{searchTerm}".</p>
      )}

      {recipe && (
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            {recipe.Recipe_name}
          </h2>
          <p className="text-gray-600 mb-4">Recipe ID: {recipe.Recipe_id}</p>
          
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside space-y-1">
            {recipe.Ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DataDisplay;
