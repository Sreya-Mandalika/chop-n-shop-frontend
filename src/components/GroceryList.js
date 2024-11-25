import React, { useState } from 'react';
import axios from 'axios';

function GroceryListForm() {
  const [preferences, setPreferences] = useState({
    budget: '',
    dietaryPreferences: '',
    allergies: '',
    storePreference: '',
    items: [],
  });

  const [newItem, setNewItem] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [groceryList, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('recipe'); // 'recipe' or 'items'

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setErrorMessage('');
    setSuccessMessage('');
    setGroceryList([]); // Reset grocery list when switching views
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevState) => ({ ...prevState, [name]: value }));
  };

  const addItem = () => {
    if (newItem.trim() !== '') {
      setPreferences((prevState) => ({
        ...prevState,
        items: [...prevState.items, newItem.trim()],
      }));
      setNewItem('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setGroceryList([]);
    setLoading(true);

    if (viewMode === 'items' && preferences.items.length === 0) {
      setErrorMessage('Please add at least one item.');
      setLoading(false);
      return;
    }

    const payload =
      viewMode === 'recipe'
        ? {
            recipe_name: recipeName,
            user_preferences: {
              Budget: parseFloat(preferences.budget) || 0,
              Dietary_preferences: preferences.dietaryPreferences,
              Allergies: preferences.allergies
                ? preferences.allergies.split(',').map((a) => a.trim())
                : [],
            },
          }
        : {
            Budget: parseFloat(preferences.budget) || 0,
            Grocery_items: preferences.items,
            Dietary_preferences: preferences.dietaryPreferences,
            Allergies: preferences.allergies
              ? preferences.allergies.split(',').map((a) => a.trim())
              : [],
            Store_preference:
              preferences.storePreference === 'None' ? null : preferences.storePreference,
          };

    try {
      const endpoint =
        viewMode === 'recipe'
          ? 'http://localhost:8000/generate_recipe_with_grocery_list'
          : 'http://localhost:8000/generate_grocery_list/';
      const response = await axios.post(endpoint, payload);
      setSuccessMessage('Grocery list generated successfully!');
      setGroceryList(response.data.grocery_list || []);
    } catch (error) {
      setErrorMessage('An error occurred while generating the list.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCost = () =>
    groceryList.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generate Your Grocery List</h2>

      <div className="flex justify-between mb-6">
        <button
          onClick={() => handleViewModeChange('recipe')}
          className={`w-48 py-3 px-4 ${viewMode === 'recipe' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-md`}
        >
          From Recipe
        </button>
        <button
          onClick={() => handleViewModeChange('items')}
          className={`w-48 py-3 px-4 ${viewMode === 'items' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-md`}
        >
          From Items
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {viewMode === 'recipe' && (
          <div className="mb-4">
            <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700">
              Recipe Name
            </label>
            <input
              type="text"
              id="recipeName"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
            />
          </div>
        )}

        {viewMode === 'items' && (
          <>
            <div className="mb-4">
              <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">
                Add Items
              </label>
              <input
                type="text"
                id="item-name"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md shadow-sm"
                placeholder="Enter item name"
              />
              <button
                type="button"
                onClick={addItem}
                className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Item
              </button>
            </div>
            <ul className="mb-6">
              {preferences.items.length > 0 ? (
                preferences.items.map((item, index) => (
                  <li key={index} className="py-2 border-b text-gray-600">
                    {item}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No items added yet.</li>
              )}
            </ul>
          </>
        )}

        {/* Common Preferences */}
        <div className="mb-4">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={preferences.budget}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dietaryPreferences" className="block text-sm font-medium text-gray-700">
            Dietary Preferences
          </label>
          <input
            type="text"
            id="dietaryPreferences"
            name="dietaryPreferences"
            value={preferences.dietaryPreferences}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
            Allergies (comma separated)
          </label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={preferences.allergies}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>

        {viewMode === 'items' && (
          <div className="mb-4">
            <label htmlFor="storePreference" className="block text-sm font-medium text-gray-700">
              Store Preference
            </label>
            <select
              id="storePreference"
              name="storePreference"
              value={preferences.storePreference}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
            >
              <option value="">Select a store preference (or none)</option>
              <option value="Trader Joe's">Trader Joe's</option>
              <option value="Whole Foods Market">Whole Foods Market</option>
              <option value="None">None</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {loading ? 'Generating...' : 'Generate Grocery List'}
        </button>
      </form>

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}

      {groceryList.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Generated Grocery List</h3>
          <ul className="mt-4">
            {groceryList.map((item, index) => (
              <li key={index} className="py-2 border-b text-gray-600">
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <div className="mt-4 text-lg font-semibold text-gray-800">
            Total Cost: ${calculateTotalCost()}
          </div>
        </div>
      )}
    </div>
  );
}

export default GroceryListForm;
