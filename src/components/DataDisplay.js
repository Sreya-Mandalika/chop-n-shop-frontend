import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataDisplay({ showData }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data when `showData` becomes true
  useEffect(() => {
    if (showData) {
      const fetchItems = async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:8000/items');
          setItems(response.data);
        } catch (err) {
          setError("Error retrieving items");
        } finally {
          setLoading(false);
        }
      };

      fetchItems();
    }
  }, [showData]);

  return (
    <div>
      <h1>Item List</h1>
      {loading && <p>Loading items...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && items.length === 0 && <p>No items found.</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Description: {item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataDisplay;
