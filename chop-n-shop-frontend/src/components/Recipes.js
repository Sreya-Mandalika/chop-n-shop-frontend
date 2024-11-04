import React, { useState } from 'react';

const recipesData = [
  { id: 1, name: 'Spaghetti Bolognese', ingredients: ['spaghetti', 'tomato sauce', 'ground beef', 'onion', 'garlic'] },
  { id: 2, name: 'Chicken Caesar Salad', ingredients: ['chicken', 'lettuce', 'caesar dressing', 'parmesan', 'croutons'] },
  { id: 3, name: 'Vegetable Stir Fry', ingredients: ['broccoli', 'carrot', 'bell pepper', 'soy sauce', 'ginger'] },
];

function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipesData.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="grid gap-4">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="p-4 bg-white border rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">{recipe.name}</h2>
            <p className="text-gray-600"><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
