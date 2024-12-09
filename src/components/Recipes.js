import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../Css/Recipes.css';

const API = "https://chop-n-shop-backend-534070775559.us-central1.run.app"
// const API = "http:localhost//8000"
function Recipes() {
  const [generateSearchTerm, setGenerateSearchTerm] = useState('');
  const [searchSearchTerm, setSearchSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [expandedRecipes, setExpandedRecipes] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPun, setCurrentPun] = useState(null);
  const foodPuns = [
    "Lettuce begin!",
    "This might take a pizza my time.",
    "Don't go bacon my heart while you wait.",
    "Donut worry, it's almost done!",
    "I'm trying to ketchup with your request.",
    "Olive the waiting game!",
    "I'm not just winging it, I promise.",
    "Hang in there, we're on a roll!",
    "This process is a piece of cake.",
    "We're really cooking now!",
    "Whisk-ing up something special for you.",
    "Simmering with anticipation...",
    "Stirring up some culinary magic.",
    "Brewing a delicious recipe for you.",
    "Marinating on your request...",
    "Spicing things up in the kitchen!",
    "Seasoning your recipe to perfection.",
    "Dishing out something tasty soon!",
    "Your recipe is in the oven, almost ready!",
    "Just a pinch more patience..."
  ];
  
  const simulateLoading = () => {
    setLoadingProgress(0);
    let punIndex = 0;
    setCurrentPun(foodPuns[punIndex]);
    
    const interval = setInterval(() => {
      setLoadingProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        const newProgress = oldProgress + 1; // Slower progress
        if (newProgress % 5 === 0) { // Change pun more frequently
          punIndex = (punIndex + 1) % foodPuns.length;
          setCurrentPun(foodPuns[punIndex]);
        }
        return newProgress;
      });
    }, 190); // Adjusted to make total time about 19 seconds
  
    return () => clearInterval(interval);
  };

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

  const handleSearchRecipeSubmit = async (e) => {
    e.preventDefault();
    if (searchSearchTerm.trim()) {
      setSearchLoading(true);
      setError(null);
  
      try {
        const response = await axios.get(`${API}/recipes/${searchSearchTerm}/`);
        
        // Check if the recipe already exists in the array
        const recipeExists = recipes.some(recipe => recipe.name === response.data.name);
        
        // If the recipe doesn't exist, add it to the beginning of the recipes array
        if (!recipeExists) {
          setRecipes(prevRecipes => [response.data, ...prevRecipes]);
        }
      } catch (err) {
        setError('Recipe not found or error occurred');
        console.error('Error searching recipe:', err);
      } finally {
        setSearchLoading(false);
      }
    }
  };
  
  const handleGenerateRecipeSubmit = async (e) => {
    e.preventDefault();
    if (generateSearchTerm.trim()) {
      setGenerateLoading(true);
      setError(null);
  
      const cleanupLoading = simulateLoading();
  
      try {
        const response = await axios.post(`${API}/generate_recipe/`, {
          recipe_prompt: generateSearchTerm
        }, {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          }
        });
        // Add the new recipe to the beginning of the recipes array
        setRecipes(prevRecipes => [response.data.recipe, ...prevRecipes]);
      } catch (err) {
        setError('Error generating new recipe');
        console.error('Error generating recipe:', err.response?.data || err.message);
      } finally {
        setGenerateLoading(false);
        cleanupLoading();
      }
    }
  };

  const toggleExpandRecipe = (index) => {
    setExpandedRecipes(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const renderRecipe = (recipe, index) => {
    if (!recipe) return null;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-left">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{recipe.name}</h2>
          <button 
            onClick={() => toggleExpandRecipe(index)}
            className="text-blue-500 hover:text-blue-700"
          >
            Show Less
          </button>
        </div>
        <h3 className="text-xl font-semibold mt-2 mb-2">Ingredients:</h3>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx}>
              {typeof ingredient === 'string' 
                ? ingredient 
                : `${ingredient.quantity} ${ingredient.ingredient}`}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Instructions:</h3>
        <ol className="list-decimal pl-5 mb-4 text-gray-700">
          {recipe.instructions.map((instruction, idx) => (
            <li key={idx} className="mb-2">{instruction}</li>
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
    <div className="font-inter bg-gray-50 min-h-screen">
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
              
              {generateLoading && (
                <div className="mt-4 mb-4 text-center">
                  <div className="w-full h-4 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-200 ease-linear"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-white">{currentPun}</p>
                </div>
              )}
            
              <button 
                type="submit" 
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300" 
                disabled={generateLoading}
              >
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

      {/* Recipes section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                {expandedRecipes.includes(index) ? (
                  <>
                    {renderRecipe(recipe, index)}
                    <button
                      onClick={() => toggleExpandRecipe(index)}
                      className="mt-4 text-blue-500 hover:text-blue-700"
                    >
                      Show Less
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => toggleExpandRecipe(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Show More
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipes;