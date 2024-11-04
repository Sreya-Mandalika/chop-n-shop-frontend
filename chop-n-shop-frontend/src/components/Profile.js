import React, { useState } from 'react';

function Profile() {
  const [dietaryRestriction, setDietaryRestriction] = useState('');

  const handleDietChange = (e) => {
    setDietaryRestriction(e.target.value);
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Picture and Info Section */}
        <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-green-400 to-blue-500">
          <img 
            className="w-24 h-24 rounded-full border-4 border-white" 
            src="https://via.placeholder.com/150" 
            alt="Profile" 
          />
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, John!</h1>
            <p className="text-white">Helping you make smart choices while grocery shopping.</p>
          </div>
        </div>

        {/* Description and Additional Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Grocery Helper</h2>
          <p className="text-gray-700 mb-4">
            Grocery Helper is designed to help you find the best deals, make meal planning easier, 
            and reduce food waste. Our aim is to make grocery shopping a hassle-free experience by providing 
            AI-based recipe recommendations and price comparisons across stores.
          </p>

          {/* Dietary Restrictions Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="dietaryRestrictions">
              Dietary Restrictions
            </label>
            <select
              id="dietaryRestrictions"
              value={dietaryRestriction}
              onChange={handleDietChange}
              className="w-full p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a restriction...</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-Free</option>
              <option value="dairy-free">Dairy-Free</option>
              <option value="nut-free">Nut-Free</option>
            </select>
          </div>

          {/* Additional Elements Placeholder */}
          <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Your Favorite Stores</h3>
            <p className="text-gray-600">Add your go-to stores for faster price comparisons!</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Your Saved Recipes</h3>
            <p className="text-gray-600">Keep track of recipes you love or want to try!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
