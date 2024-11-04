import React, { useState } from 'react';
import './App.css';
import './index.css';  
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GroceryList from './components/GroceryList';
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import Profile from './components/Profile';

// Mock data structure
const mockGroceryData = {
  stores: {
    "Walmart": {
      items: [
        { name: "Milk", quantity: 1, price: 3.99, recipeId: "1" },
        { name: "Bread", quantity: 2, price: 2.49, recipeId: "1" }
      ],
      total: 8.97
    },
    "Target": {
      items: [
        { name: "Eggs", quantity: 1, price: 4.99, recipeId: "2" }
      ],
      total: 4.99
    }
  }
};

function App() {
  const [groceryData] = useState(mockGroceryData);
  const [currentPage, setCurrentPage] = useState('profile');

  const handleSearch = (query) => {
    console.log('Searching:', query);
    // Implement search logic
  };

  const handleStoreFilter = (store) => {
    console.log('Filtering by store:', store);
    // Implement store filtering
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header loggedIn={true} userName="John" />
      <main>
        <SearchBar 
          onSearch={handleSearch}
          availableStores={Object.keys(groceryData.stores)}
          onStoreFilter={handleStoreFilter}
        />
        {currentPage === 'grocery-list' && <GroceryList groceryData={groceryData} />}
        {currentPage === 'recipe-book' && <Recipes />}
        {currentPage === 'profile' && <Profile/>}

      </main>
      <Navigation 
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
   
    </div>
  );
}

export default App;