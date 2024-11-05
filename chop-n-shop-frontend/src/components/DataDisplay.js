import React, { useEffect, useState } from 'react';

// Component to display data from API
const DataDisplay = () => {
  const [data, setData] = useState([]);  
  // loading state  //  
  const [loading, setLoading] = useState(true);
  // error state
  const [error, setError] = useState(null);   

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(''); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);          
      } catch (err) {
        setError(err.message);    
      } finally {
       // Update loading state
        setLoading(false);        
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Data from API</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
