import React, { useState, useEffect } from 'react';
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
  const [userGroceryLists, setUserGroceryLists] = useState([]); // Store all the user's grocery lists

  // const fetchUserGroceryLists = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/grocery_lists', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     console.log(response.data);  // Check the response data here
  //     setUserGroceryLists(response.data);
  //   } catch (error) {
  //     console.error('Error fetching grocery lists:', error);
  //     setErrorMessage('Failed to fetch grocery lists.');
  //   }
  // };
  // When calling the delete endpoint, ensure you have a valid list ID
  const handleDelete = async (listId) => {
    if (!listId) {
      console.log("no id given");
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      await axios.delete(`http://localhost:8000/grocery_lists/${listId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Refresh the list after successful deletion
      fetchUserGroceryLists();
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };
  const fetchUserGroceryLists = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await axios.get('http://localhost:8000/grocery_lists', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.grocery_lists) {
        setUserGroceryLists(response.data.grocery_lists);
      }
    } catch (error) {
      console.error('Error fetching grocery lists:', error);
      setErrorMessage('Failed to fetch grocery lists');
    }
  };
  useEffect(() => {
    fetchUserGroceryLists(); // Fetch lists when the component mounts
  }, []);

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
      const response = await axios.post(endpoint, payload, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          
      setSuccessMessage('Grocery list generated successfully!');
      setGroceryList(response.data.grocery_list || []);
      fetchUserGroceryLists();
      console.log(JSON.stringify(payload, null, 2));

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
              <option value="None">None</option>
              <option value="Store1">Store1</option>
              <option value="Store2">Store2</option>
            </select>
          </div>
        )}

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {loading ? 'Generating...' : 'Generate List'}
          </button>
        </div>
      </form>

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

      {/* Display User's Grocery Lists */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Grocery Lists</h3>
        <div className="space-y-4">
          {userGroceryLists.length > 0 ? (
            userGroceryLists.map((list, index) => (
              
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <div className="relative">
                  <button
                    onClick={() => handleDelete (list._id)}
                    
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>

                {list["Trader Joe's"]?.items && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700">Trader Joe's</h4>
                    {list["Trader Joe's"].items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{item.Item_name}</span>
                        <span>${item.Price}</span>
                      </div>
                    ))}
                    <div className="mt-2 text-right text-sm font-medium">
                      Total: ${list["Trader Joe's"].Total_Cost}
                    </div>
                  </div>
                )}
                
                {list["Whole Foods Market"]?.items && (
                  <div>
                    <h4 className="font-medium text-gray-700">Whole Foods Market</h4>
                    {list["Whole Foods Market"].items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{item.Item_name}</span>
                        <span>${item.Price}</span>
                      </div>
                    ))}
                    <div className="mt-2 text-right text-sm font-medium">
                      Total: ${list["Whole Foods Market"].Total_Cost}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No grocery lists available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroceryListForm;
