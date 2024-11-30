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
  const [viewMode, setViewMode] = useState('recipe'); 
  const [userGroceryLists, setUserGroceryLists] = useState([]); 
  const [listName, setListName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemStore, setNewItemStore] = useState('Trader Joe\'s');
  


  const handleAddNewItem = async (listId) => {
    if (!newItemName || !newItemStore) {
      setErrorMessage('Please fill in all item details');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(
        `http://localhost:8000/grocery_lists/${listId}/add_item`,
        {
          Item_name: newItemName,
          Store_name: newItemStore,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        setSuccessMessage('Item added successfully');
        setNewItemName('');
        fetchUserGroceryLists();  // Refresh the grocery lists
      }
    } catch (error) {
      setErrorMessage('Failed to add item');
      console.error('Error:', error);
    }
  };

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
    setPreferences((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
            list_name: listName, // Explicitly include the list name here
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
      setListName('');
    } catch (error) {
      setErrorMessage('An error occurred while generating the list.');
    } finally {
      setLoading(false);
    }
  };
  
  
  const filteredGroceryLists = userGroceryLists.filter(list => 
    list && list.list_name && list.list_name.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(list => {
    if (list.recipe_name) {
      // This is a recipe grocery list
      return {
        ...list,
        "Whole Foods Market": {
          items: list.grocery_list,
          Total_Cost: list.total_cost
        }
      };
    }
    return list;
  });
  const fieldsToRemove = ['recipe_id', 'user_id', 'created_at', 'grocery_list', 'total_cost', 'over_budget'];

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
        <div className="mb-4">
            <label htmlFor="listName" className="block text-sm font-medium text-gray-700">
              List Name
            </label>
            <input
              type="text"
              id="listName"
              value={listName}
              onChange={(e) => setListName(e.target.value)} 
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
              placeholder="Enter a name for your list"
            />
        </div>
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
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-full border rounded-md shadow-sm"
            placeholder="Search lists by name"
          />
        </div>
        <div className="space-y-4">
        {filteredGroceryLists.length > 0 ? (
              filteredGroceryLists.map((list, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg">
                  <div className="relative">
                    <button onClick={() => handleDelete(list._id)} className="absolute top-2 right-2 text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                  
                  <h1 className="text-xl font-bold mb-2 text-gray-800">
                    {list.list_name || list.recipe_name || 'Unnamed List'}
                  </h1>
                  {Object.entries(list ?? {}).filter(([key]) => !fieldsToRemove.includes(key) && key !== '_id' && key !== 'list_name' && key !== 'recipe_name').map(([storeName, storeData]) => (
                    <div key={storeName}>
                      <h4 className="font-medium text-gray-700">{storeName}</h4>
                      {storeData?.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>{item?.item_name || item?.Item_name}</span>
                          <span>${item?.price || item?.Price}</span>
                        </div>
                      ))}
                      <div className="mt-2 text-right text-sm font-medium">
                        Total: ${storeData?.Total_Cost}
                      </div>
                    </div>
                  ))}


                  {/* Add item form */}
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Add New Item</h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                      <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="Item name"
                        className="p-2 border rounded"
                      />
                      <select
                        value={newItemStore}
                        onChange={(e) => setNewItemStore(e.target.value)}
                        className="p-2 border rounded"
                      >
                        <option value="Whole Foods Market">Whole Foods Market</option>
                        <option value="Trader Joe's">Trader Joe's</option>
                      </select>
                
                      <button
                        onClick={() => handleAddNewItem(list._id)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
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
