import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GroceryList from './components/GroceryList';
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import Profile from './components/Profile';
import Home from './components/Home';
import PriceComparison from './components/Price';
import UserLogin from './components/UserLogin';

const mockCurrentList = {
  stores: {
    "Trader Joe's": {
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

const mockStores = [
  "Trader Joe's",
  "Whole Foods",
  "Kroger",
  "Walmart",
  "Target"
];

function App() {
  const [currentList, setCurrentList] = useState(mockCurrentList);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handlers
  const handleSearch = (query) => {
    console.log('Searching:', query);
  };
  
  const handleStoreFilter = (store) => {
    console.log('Filtering by store:', store);
  };

  const handleAddItem = (item) => {
    const { store, name, quantity, price } = item;
    setCurrentList(prevList => {
      const newList = { ...prevList };
      if (!newList.stores[store]) {
        newList.stores[store] = { items: [], total: 0 };
      }
      newList.stores[store].items.push({
        name,
        quantity,
        price,
        recipeId: null
      });
      newList.stores[store].total = newList.stores[store].items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      );
      return newList;
    });
  };

  const handleLoginOrSignup = (userData) => {
    setIsLoggedIn(true);
    console.log("User logged in:", userData);
  };

  return (
    <div className="flex flex-col h-screen">
      {!isLoggedIn ? (
        <UserLogin onLoginOrSignup={handleLoginOrSignup} />
      ) : (
        <Router>
          <Header loggedIn={isLoggedIn} userName="John" />
          <main className="flex-1 overflow-y-auto bg-gray-50 pb-16">
            <SearchBar
              onSearch={handleSearch}
              onStoreFilter={handleStoreFilter}
              availableStores={mockStores}
            />
            <Routes>
              <Route path="/home" element={<Home groceryData={currentList} />} />
              <Route path="/grocery-list" element={<GroceryList />} />
              <Route path="/recipe-book" element={<Recipes />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/price-comparison" element={<PriceComparison />} />
            </Routes>
          </main>
          <Navigation />
        </Router>
      )}
    </div>
  );
}

export default App;
