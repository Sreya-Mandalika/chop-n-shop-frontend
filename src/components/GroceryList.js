import React, { useState } from 'react';
import axios from 'axios';

function GroceryListForm() {
  const [preferences, setPreferences] = useState({
    budget: '',
    dietaryPreferences: '', // String for dietary preference (dropdown)
    allergies: '', // String, but split into array when submitted
    storePreference: '', // String (Trader Joe's, Whole Foods Market, or null)
    items: [], // Array of items
  });

  const [newItem, setNewItem] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [groceryList, setGroceryList] = useState(null); // Store the response with the grocery list
  const [loading, setLoading] = useState(false); // Loading state to track API request

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
    setGroceryList(null); // Reset the grocery list before new request
    setLoading(true); // Start loading

    if (preferences.items.length === 0) {
      setErrorMessage('Please add at least one item to the list.');
      setLoading(false); // Stop loading
      return;
    }

    const preferencesData = {
      Budget: parseFloat(preferences.budget) || 0, // Ensure budget is a float
      Grocery_items: preferences.items, // Array of strings for items
      Dietary_preferences: preferences.dietaryPreferences, // String (vegan, vegetarian, etc.)
      Allergies: preferences.allergies ? preferences.allergies.split(',').map((a) => a.trim()) : [], // Split allergies into array of strings
      Store_preference: preferences.storePreference === 'None' ? null : preferences.storePreference, // Send null for "None"
    };

    try {
      const response = await axios.post('http://localhost:8000/generate_grocery_list/', preferencesData);
      setSuccessMessage('Grocery list generated successfully!');
      setGroceryList(response.data.grocery_list); // Store the grocery list from the response
    } catch (error) {
      setErrorMessage('An error occurred while generating the list.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generate Your Grocery List</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
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
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies (comma separated)</label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={preferences.allergies}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dietaryPreferences" className="block text-sm font-medium text-gray-700">Dietary Preference</label>
          <select
            id="dietaryPreferences"
            name="dietaryPreferences"
            value={preferences.dietaryPreferences}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          >
            <option value="">Select a dietary preference</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="lactose-free">Lactose-Free</option>
            <option value="pescetarian">Pescetarian</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="storePreference" className="block text-sm font-medium text-gray-700">Store Preference</label>
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
            <option value="None">None</option> {/* Adjusted the "None" value */}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">Items:</label>
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

        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-700">Items</h4>
          <ul className="mt-2">
            {preferences.items.map((item, index) => (
              <li key={index} className="py-2 border-b text-gray-600">{item}</li>
            ))}
          </ul>
        </div>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Generate Grocery List
          </button>
        </div>
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-6 flex justify-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Display the grocery list if available */}
      {groceryList && !loading && (
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          {/* Display both lists if "None" is selected */}
          {preferences.storePreference === 'None' || preferences.storePreference === '' ? (
            <>
              {groceryList["Trader Joe's"] && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Grocery List for Trader Joe's</h3>
                  <ul className="mt-4">
                    {groceryList["Trader Joe's"].items.map((item, index) => (
                      <li key={index} className="py-2 border-b">
                        <span className="font-medium">{item.Item_name}</span> - ${item.Price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 font-semibold">
                    Total Cost: ${groceryList["Trader Joe's"].Total_Cost.toFixed(2)}
                  </div>
                </div>
              )}

              {groceryList["Whole Foods Market"] && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800">Grocery List for Whole Foods Market</h3>
                  <ul className="mt-4">
                    {groceryList["Whole Foods Market"].items.map((item, index) => (
                      <li key={index} className="py-2 border-b">
                        <span className="font-medium">{item.Item_name}</span> - ${item.Price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 font-semibold">
                    Total Cost: ${groceryList["Whole Foods Market"].Total_Cost.toFixed(2)}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {groceryList[preferences.storePreference] && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Grocery List for {preferences.storePreference}</h3>
                  <ul className="mt-4">
                    {groceryList[preferences.storePreference].items.map((item, index) => (
                      <li key={index} className="py-2 border-b">
                        <span className="font-medium">{item.Item_name}</span> - ${item.Price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 font-semibold">
                    Total Cost: ${groceryList[preferences.storePreference].Total_Cost.toFixed(2)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GroceryListForm;
