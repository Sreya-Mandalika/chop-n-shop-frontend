import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../Css/Recipes.css';

const API = "https://chop-n-shop-backend-534070775559.us-central1.run.app"
console.log('API constant:', API);
// const API = "http:localhost//8000"
function Recipes() {
  const [generateSearchTerm, setGenerateSearchTerm] = useState('');
  const [searchSearchTerm, setSearchSearchTerm] = useState('');
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });
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
  
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    console.log('Recipes component mounted');
    console.log('API URL:', API);
    console.log('Initial recipes state:', recipes);
  }, []);

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
        const newProgress = oldProgress + 2; // Increased from 1 to 2
        if (newProgress % 10 === 0) { // Changed from 5 to 10
          punIndex = (punIndex + 1) % foodPuns.length;
          setCurrentPun(foodPuns[punIndex]);
        }
        return newProgress;
      });
    }, 140); // Reduced from 190 to 140
  
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
    console.log('Generate button clicked');
    console.log('Current generateSearchTerm:', generateSearchTerm);
  
    if (generateSearchTerm.trim()) {
      setGenerateLoading(true);
      setError(null);
  
      console.log('Before API call');
      const cleanupLoading = simulateLoading();
  
      try {
        console.log('Making API call to:', `${API}/generate_recipe/`);
        const response = await axios.post(`${API}/generate_recipe/`, {
          recipe_prompt: generateSearchTerm
        }, {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          }
        });
        console.log('API response received:', response.data);
        setRecipes(prevRecipes => [response.data.recipe, ...prevRecipes]);
      } catch (err) {
        console.error('Error in API call:', err);
        console.error('Error response:', err.response);
        console.error('Error request:', err.request);
        setError('Error generating new recipe: ' + (err.response?.data?.message || err.message));
      } finally {
        setGenerateLoading(false);
        cleanupLoading();
        console.log('Generate process completed');
      }
    } else {
      console.log('Generate search term is empty');
    }
  };

  const clearAllRecipes = () => {
    setRecipes([]);
    localStorage.removeItem('recipes');
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
            {expandedRecipes.includes(index) ? 'Show Less' : 'Show More'}
          </button>
        </div>
        {expandedRecipes.includes(index) && (
          <>
            <h3 className="text-xl font-semibold mt-2 mb-2">Ingredients:</h3>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>
                    {typeof ingredient === 'string' 
                      ? ingredient 
                      : ingredient && ingredient.quantity && ingredient.ingredient
                        ? `${ingredient.quantity} ${ingredient.ingredient}`
                        : 'Ingredient details not available'}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-gray-700">No ingredients available for this recipe.</p>
            )}
            <h3 className="text-xl font-semibold mt-4 mb-2">Instructions:</h3>
            {recipe.instructions && recipe.instructions.length > 0 ? (
              <ol className="list-decimal pl-5 mb-4 text-gray-700">
                {recipe.instructions.map((instruction, idx) => (
                  <li key={idx} className="mb-2">{instruction}</li>
                ))}
              </ol>
            ) : (
              <p className="mb-4 text-gray-700">No instructions available for this recipe.</p>
            )}
            <div className="mt-4">
              <p><strong>Prep Time:</strong> {recipe.prep_time || 'Not specified'}</p>
              <p><strong>Cook Time:</strong> {recipe.cook_time || 'Not specified'}</p>
              <p><strong>Total Time:</strong> {recipe.total_time || 'Not specified'}</p>
            </div>
          </>
        )}
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
          <p className="text-lg mb-6">
            Generate a new recipe or search for a recipe you've created before.
          </p>
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
                onClick={handleGenerateRecipeSubmit}
                disabled={generateLoading}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recipes</h2>
          <button 
            onClick={clearAllRecipes}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
          >
            Clear All Recipes
          </button>
        </div>
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