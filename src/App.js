import React, { useState } from 'react';
import './App.css';
import './index.css';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GroceryList from './components/GroceryList';
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import Profile from './components/Profile';
import Home from './components/Home';
import PriceComparison from './components/Price';
import UserLogin from './components/UserLogin';


// Mock data structure for current list
const mockCurrentList = {
  stores: {
    "Trader Joes": {
      items: [
        { name: "Milk", quantity: 1, price: 3.99, recipeId: "1" },
        { name: "Bread", quantity: 2, price: 2.49, recipeId: "1" }
      ],
      total: 8.97
    },
    "Whole Foods": {
      items: [
        { name: "Eggs", quantity: 1, price: 4.99, recipeId: "2" }
      ],
      total: 4.99
    }
  }
};

// Mock data for available stores
const mockStores = [
  "Trader Joes",
  "Whole Foods",
  "Kroger",
  "Walmart",
  "Target"
];

function App() {
  // State management
  const [currentList, setCurrentList] = useState(mockCurrentList);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser] = useState({
    name: "John",
    isLoggedIn: true
  });

  // Handlers
  const handleSearch = (query) => {
    console.log('Searching:', query);
    // Implement search functionality
  };

  const handleStoreFilter = (store) => {
    console.log('Filtering by store:', store);
    // Implement store filtering
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleAddItem = (item) => {
    const { store, name, quantity, price } = item;
    
    setCurrentList(prevList => {
      const newList = { ...prevList };
      
      // If store doesn't exist, create it
      if (!newList.stores[store]) {
        newList.stores[store] = {
          items: [],
          total: 0
        };
      }
      
      // Add new item to store
      newList.stores[store].items.push({
        name,
        quantity,
        price,
        recipeId: null // Can be updated when adding from recipes
      });
      
      // Recalculate store total
      newList.stores[store].total = newList.stores[store].items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );
      
      return newList;
    });
  };

  const handleRemoveItem = (store, itemIndex) => {
    setCurrentList(prevList => {
      const newList = { ...prevList };
      const storeData = newList.stores[store];
      
      if (storeData && storeData.items) {
        // Remove the item
        storeData.items.splice(itemIndex, 1);
        
        // Recalculate store total
        storeData.total = storeData.items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        );
        
        // If store has no items, remove the store
        if (storeData.items.length === 0) {
          delete newList.stores[store];
        }
      }
      
      return newList;
    });
  };

  const handleUpdateItemQuantity = (store, itemIndex, newQuantity) => {
    setCurrentList(prevList => {
      const newList = { ...prevList };
      const item = newList.stores[store].items[itemIndex];
      
      if (item) {
        // Update quantity
        item.quantity = newQuantity;
        
        // Recalculate store total
        newList.stores[store].total = newList.stores[store].items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        );
      }
      
      return newList;
    });
  };

  const handleLoginOrSignup = (formData) => {
    // Implement your login or signup logic here
    console.log('Form data:', formData);
    setIsLoggedIn(true);
  };

  return (
    <div className="flex flex-col h-screen">
      {!isLoggedIn ? (
        <UserLogin onLoginOrSignup={handleLoginOrSignup} />
      ) : (
        <>
          <Header loggedIn={isLoggedIn} userName={loggedInUser.name} />
          <main className="flex-1 overflow-y-auto bg-gray-50 pb-16">
            {/* Show SearchBar only on necessary pages */}
            {(currentPage === 'grocery-list' || currentPage === 'home') && (
              <SearchBar 
                onSearch={handleSearch} 
                onStoreFilter={handleStoreFilter}
                availableStores={mockStores}
              />
            )}
            
            {/* Page Content */}
            {currentPage === 'home' && (
              <Home 
                groceryData={currentList}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateItemQuantity}
                availableStores={mockStores}
              />
            )}
            
            {currentPage === 'grocery-list' && (
              <GroceryList />
            )}
            
            {currentPage === 'recipe-book' && (
              <Recipes />
            )}
            
            {currentPage === 'profile' && (
              <Profile />
            )} 
            {currentPage === 'price-comparison' && (
              <PriceComparison />
            )}
          </main>
          <Navigation 
            currentPage={currentPage} 
            onNavigate={handleNavigate}
          />
        </>
      )}
    </div>
  );
}

export default App;