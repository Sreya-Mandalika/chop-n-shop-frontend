import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';

const recipesData = [
  { "id":1,
    "recipe": "Spaghetti with Marinara Sauce",
    "ingredients": ["Spaghetti", "Tomatoes", "Garlic", "Olive Oil", "Basil"],
    "prepTime": "30 minutes",
    "nutrition": {
      "calories": 400,
      "protein": "15g",
      "fat": "10g",
      "carbs": "70g"
    },
    "instructions": "Boil pasta, prepare sauce by cooking tomatoes with garlic and basil.",
    "link": "https://example.com/spaghetti-marinara"
  },
  { "id":2,
    "recipe": "Banana Smoothie",
    "ingredients": ["Banana", "Almond Milk", "Honey", "Ice Cubes"],
    "prepTime": "5 minutes",
    "nutrition": {
      "calories": 200,
      "protein": "5g",
      "fat": "2g",
      "carbs": "45g"
    },
    "instructions": "Blend all ingredients until smooth.",
    "link": "https://example.com/banana-smoothie"
  },
  { "id":3,
    "recipe": "Grilled Chicken Salad",
    "ingredients": ["Chicken Breast", "Lettuce", "Cherry Tomatoes", "Cucumber", "Olive Oil"],
    "prepTime": "20 minutes",
    "nutrition": {
      "calories": 350,
      "protein": "30g",
      "fat": "15g",
      "carbs": "10g"
    },
    "instructions": "Grill the chicken and toss with salad ingredients.",
    "link": "https://example.com/grilled-chicken-salad"
  }
];

function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipesData.filter(recipe =>
    recipe.recipe.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Recipe Collection</h1>
        <p className="text-gray-600">
          Browse your saved recipes, find cooking inspiration, and easily add ingredients to your shopping list.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="grid gap-4">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{recipe.recipe}</h2>
              <p className="text-gray-600"><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
              <p className="text-gray-600"><strong>Preparation Time:</strong> {recipe.prepTime}</p>
              
            </div>
            <SaveIcon className="h-6 w-6 text-blue-500 cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;