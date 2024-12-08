import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Recipes.css';

const API = "https://chop-n-shop-backend-534070775559.us-central1.run.app"

function Recipes() {
  const [generateSearchTerm, setGenerateSearchTerm] = useState('');
  const [searchSearchTerm, setSearchSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [newRecipeData, setNewRecipeData] = useState(null);
  const [existingRecipeData, setExistingRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API}/recipes/`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleGenerateRecipeSubmit = async (e) => {
    e.preventDefault();
    if (generateSearchTerm.trim()) {
      setGenerateLoading(true);
      setError(null);
      setNewRecipeData(null);
  
      try {
        const response = await axios.post(`${API}/generate_recipe/`, {
          recipe_prompt: generateSearchTerm
        }, {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          }
        });
        setNewRecipeData(response.data);
        setRecipes([response.data.recipe, ...recipes]);
      } catch (err) {
        setError('Error generating new recipe');
        console.error('Error generating recipe:', err.response?.data || err.message);
        console.error('Full error object:', err);
      } finally {
        setGenerateLoading(false);
      }
    }
  };

  const handleSearchRecipeSubmit = async (e) => {
    e.preventDefault();
    if (searchSearchTerm.trim()) {
      setSearchLoading(true);
      setError(null);
      setExistingRecipeData(null);

      try {
        const response = await axios.get(`${API}/recipes/${searchSearchTerm}/`);
        setExistingRecipeData(response.data);
      } catch (err) {
        setError('Recipe not found or error occurred');
        console.error('Error searching recipe:', err);
      } finally {
        setSearchLoading(false);
      }
    }
  };

  const toggleExpandRecipe = (index) => {
    setExpandedRecipe(expandedRecipe === index ? null : index);
  };

  const renderRecipe = (recipe) => {
    if (!recipe) return null;

    return (
      <div className="mt-8 px-4">
        <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">Ingredients:</h3>
        <ul className="list-disc pl-5 mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Instructions:</h3>
        <ol className="list-decimal pl-5 mb-4">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="mb-2">{instruction}</li>
          ))}
        </ol>
        <div className="mt-4">
          <p><strong>Prep Time:</strong> {recipe.prep_time}</p>
          <p><strong>Cook Time:</strong> {recipe.cook_time}</p>
          <p><strong>Total Time:</strong> {recipe.total_time}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="font-inter bg-white min-h-screen">
      <div
        className="relative w-full h-[35rem] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("https://foodconfidence.com/wp-content/uploads/2019/06/AdobeStock_163417612.jpeg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Create and Search for Recipes</h1>
          <div className="flex flex-col gap-4 justify-center mb-4 max-w-md mx-auto">
            <form onSubmit={handleGenerateRecipeSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Generate a new recipe (e.g., chocolate cake, vegan tacos...)"
                value={generateSearchTerm}
                onChange={(e) => setGenerateSearchTerm(e.target.value)}
                className="pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
              />
              <button type="submit" className="bg-spotifyGreen text-white px-4 py-2 rounded-lg shadow" disabled={generateLoading}>
                {generateLoading ? 'Generating...' : 'Generate Recipe'}
              </button>
            </form>
            
            <form onSubmit={handleSearchRecipeSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Search for an existing recipe"
                value={searchSearchTerm}
                onChange={(e) => setSearchSearchTerm(e.target.value)}
                className="pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow" disabled={searchLoading}>
                {searchLoading ? 'Searching...' : 'Search Recipe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {renderRecipe(newRecipeData?.recipe || existingRecipeData)}

      <div id="main-content" className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Recipes</h2>
        {recipes.map((recipe, index) => (
          <div key={index} className="mb-4 p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{recipe.name}</h3>
            <button onClick={() => toggleExpandRecipe(index)} className="mt-2 text-blue-500">
              {expandedRecipe === index ? 'Show Less' : 'Show More'}
            </button>
            {expandedRecipe === index && renderRecipe(recipe)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;