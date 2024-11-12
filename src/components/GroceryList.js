import React, { useState, useEffect } from "react";

const GroceryListApp = () => {
  const [groceryList, setGroceryList] = useState([]);
  const [newItem, setNewItem] = useState({ item_name: "", quantity: 1, store_name: "" });
  const userId = "670566bb2a7dbfa83fda986b"; // Replace with the actual user ID

  // Fetch the grocery list from the backend
  useEffect(() => {
    fetchGroceryList();
  }, []);

  const fetchGroceryList = async () => {
    try {
      const response = await fetch(`/users/${userId}/grocery-list/`);
      if (!response.ok) throw new Error("Failed to fetch grocery list.");
      const data = await response.json();
      setGroceryList(data);
    } catch (error) {
      console.error("Error fetching grocery list:", error);
    }
  };

  // Add a new item to the grocery list
  const addGroceryItem = async () => {
    try {
      const response = await fetch(`/users/${userId}/grocery-list/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) throw new Error("Failed to add grocery item.");
      const data = await response.json();
      setGroceryList([...groceryList, data.grocery_item]);
      setNewItem({ item_name: "", quantity: 1, store_name: "" }); // Reset form
    } catch (error) {
      console.error("Error adding grocery item:", error);
    }
  };

  return (
    <div>
      <h1>Grocery List</h1>
      <ul>
        {groceryList.map((item) => (
          <li key={item.item_id}>
            {item.item_name} - {item.quantity} {item.store_name && `from ${item.store_name}`}
          </li>
        ))}
      </ul>

      <h2>Add New Item</h2>
      <input
        type="text"
        placeholder="Item Name"
        value={newItem.item_name}
        onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Store Name (optional)"
        value={newItem.store_name}
        onChange={(e) => setNewItem({ ...newItem, store_name: e.target.value })}
      />
      <button onClick={addGroceryItem}>Add Item</button>
    </div>
  );
};

export default GroceryListApp;
