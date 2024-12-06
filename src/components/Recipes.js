import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Recipes.css';

function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecipe, setNewRecipe] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState(null); // State to track which recipe is expanded

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(`http://localhost:8000/recipes/${searchTerm}`);
      setRecipes([response.data]);
    } catch (error) {
      setErrorMessage('Recipe not found or error occurred');
      console.error('Error searching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!newRecipe.trim()) {
      setErrorMessage('Recipe name cannot be empty');
      setLoading(false);
      return;
    }

    try {
      const payload = { name: newRecipe.trim() };
      console.log('Creating recipe with payload:', payload);

      const response = await axios.post('http://localhost:8000/generate_recipe', payload);
      setRecipes([...recipes, response.data]);
      setNewRecipe('');
    } catch (error) {
      setErrorMessage('Error creating recipe');
      console.error('Error creating recipe:', error.response ? error.response.data : error);
      if (error.response && error.response.data) {
        console.error('Backend error detail:', error.response.data.detail);
      }
      console.error('Full error response:', error); // Log the full error response
    } finally {
      setLoading(false);
    }
  };

  const toggleExpandRecipe = (index) => {
    if (expandedRecipe === index) {
      setExpandedRecipe(null); // Collapse if already expanded
    } else {
      setExpandedRecipe(index); // Expand the selected recipe
    }
  };

  return (
    <div className="font-inter bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <div
        className="relative w-full h-[35rem] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("https://foodconfidence.com/wp-content/uploads/2019/06/AdobeStock_163417612.jpeg")' }}  // Replace with your image URL
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Create and Search for Recipes</h1>
          <div className="flex flex-col gap-4 justify-center mb-4 max-w-md mx-auto">
            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter recipe name"
                value={newRecipe}
                onChange={(e) => setNewRecipe(e.target.value)}
                className="pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
              />
              <button type="submit" className="bg-spotifyGreen text-white px-4 py-2 rounded-lg shadow">
                {loading ? 'Creating...' : 'Create'}
              </button>
            </form>
            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Search for a recipe"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                style={{ color: 'black' }}
              />
              <button type="submit" className="bg-spotifyGreen text-white px-4 py-2 rounded-lg shadow">
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>
          <div className="mt-8">
            <a href="#main-content" className="text-lg underline">Scroll down to view past recipes</a>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="main-content" className="pt-5 p-4 space-y-6">
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div className="recipes-list">
          <h2 className="text-2xl font-semibold mb-4">Past Recipes</h2>
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div key={index} className="recipe-item bg-white p-6 rounded-lg shadow mb-4">
                <h3 className="text-xl font-bold">{recipe.name}</h3>
                {expandedRecipe === index && (
                  <div>
                    <p><strong>Ingredients:</strong></p>
                    <ul className="list-disc list-inside">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                    <p><strong>Instructions:</strong></p>
                    <ol className="list-decimal list-inside">
                      {recipe.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ol>
                    <p><strong>Prep Time:</strong> {recipe.prep_time}</p>
                    <p><strong>Cook Time:</strong> {recipe.cook_time}</p>
                    <p><strong>Total Time:</strong> {recipe.total_time}</p>
                    <p><strong>Link:</strong> {recipe.link}</p>
                  </div>
                )}
                <button onClick={() => toggleExpandRecipe(index)} className="mt-2 text-spotifyGreen underline">
                  {expandedRecipe === index ? 'Show Less' : 'Show More'}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recipes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipes;