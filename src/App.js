import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HeaderNav from './components/HeaderNav'; // Import the new combined HeaderNav component
import GroceryList from './components/GroceryList';
import Recipes from './components/Recipes';
import Profile from './components/Profile';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import LandingPage from './components/Landing';

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
];

function MainApp() {
  const [currentList, setCurrentList] = useState(mockCurrentList);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasVisitedLanding, setHasVisitedLanding] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Handlers
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
    navigate('/home');
  };

  const handleVisitLanding = () => {
    setHasVisitedLanding(true);
    navigate('/login');
  };

  // Determine if the header should be shown
  const shouldShowHeader = location.pathname !== '/' && location.pathname !== '/login';

  // Redirect to landing page on refresh if not logged in
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/' && location.pathname !== '/login') {
      navigate('/');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <>
      {shouldShowHeader && <HeaderNav loggedIn={isLoggedIn} />}
      <div className={`pt-24 flex flex-col h-screen ${shouldShowHeader ? '' : 'pt-0'}`}>
        <Routes>
          <Route path="/" element={<LandingPage onVisit={handleVisitLanding} />} />
          <Route path="/login" element={<UserLogin onLoginOrSignup={handleLoginOrSignup} />} />
          <Route path="/home" element={<Home groceryData={currentList} />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="/recipe-book" element={<Recipes />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;