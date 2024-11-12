
const API_URL = process.env.REACT_APP_API_URL;

// Fetch all items
export const fetchItems = async () => {
    const response = await fetch(`${API_URL}/items/`);
    if (!response.ok) {
        throw new Error("Failed to fetch items");
    }
    return await response.json();
};

// fetch a single item by ID
export const fetchItemById = async (item_id) => {
    const response = await fetch(`${API_URL}/items/${item_id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch item");
    }
    return await response.json();
};

// create a new item
export const createItem = async (itemData) => {
    const response = await fetch(`${API_URL}/items/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
    });
    if (!response.ok) {
        throw new Error("Failed to create item");
    }
    return await response.json();
};

// update an item by ID
export const updateItem = async (item_id, itemData) => {
    const response = await fetch(`${API_URL}/items/${item_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
    });
    if (!response.ok) {
        throw new Error("Failed to update item");
    }
    return await response.json();
};

// delete an item by ID
export const deleteItem = async (item_id) => {
    const response = await fetch(`${API_URL}/items/${item_id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete item");
    }
    return await response.json();
};

// create a new user
export const addUser = async (userData) => {
  const response = await fetch(`${API_URL}/add_user/`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
  });
  if (!response.ok) {
      throw new Error("Failed to create item");
  }
  return await response.json();
};

// create a grocery list
export const createGroceryList = async (groceryData) => {
  const response = await fetch(`${API_URL}/users/${user_id}/grocery-list`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(groceryData),
  });
  if (!response.ok) {
      throw new Error("Failed to create list");
  }
  return await response.json();
};
