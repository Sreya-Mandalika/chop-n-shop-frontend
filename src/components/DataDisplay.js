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
    <div>
      <h1>Recipe Search</h1>
      
      {loading && <p>Loading recipe...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !recipe && !error && <p>No recipe found for "{searchTerm}".</p>}
      {recipe && (
        <div>
          <h2>{recipe.Recipe_name}</h2>
          <p>Recipe ID: {recipe.Recipe_id}</p>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.Ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DataDisplay;
