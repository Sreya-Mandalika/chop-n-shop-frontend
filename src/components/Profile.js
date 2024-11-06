import React, { useState } from 'react';
import { X } from 'lucide-react';

function Profile() {
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [allergyInput, setAllergyInput] = useState('');

  const handleDietChange = (value) => {
    setDietaryRestrictions(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleAllergySubmit = (e) => {
    e.preventDefault();
    if (allergyInput.trim() && !allergies.includes(allergyInput.trim())) {
      setAllergies(prev => [...prev, allergyInput.trim()]);
      setAllergyInput('');
    }
  };

  const removeAllergy = (allergy) => {
    setAllergies(prev => prev.filter(item => item !== allergy));
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Picture and Info Section */}
        <div className="flex items-center space-x-6 p-12 bg-gradient-to-r from-green-400 to-blue-500">
          <img 
            className="w-24 h-24 rounded-full border-4 border-white" 
            src="/api/placeholder/150/150" 
            alt="Profile" 
          />
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, John!</h1>
            <p className="text-white">Slice your grocery bill and food waste.</p>
          </div>
        </div>

        {/* Description and Additional Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Chop N' Shop</h2>
          <p className="text-gray-700 mb-4">
            Chop N' Shop is designed to help you find the best deals, make meal planning easier, 
            and reduce food waste. Our aim is to make grocery shopping a hassle-free experience by providing 
            AI-based recipe recommendations and price comparisons across stores.
          </p>

          {/* Dietary Restrictions Checkboxes */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Dietary Restrictions
            </label>
            <div className="space-y-2">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'].map((restriction) => (
                <label key={restriction} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={dietaryRestrictions.includes(restriction.toLowerCase())}
                    onChange={() => handleDietChange(restriction.toLowerCase())}
                    className="rounded text-blue-500 focus:ring-blue-400"
                  />
                  <span className="text-gray-700">{restriction}</span>
                </label>
              ))}
            </div>
            {dietaryRestrictions.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected restrictions:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {dietaryRestrictions.map(restriction => (
                    <span
                      key={restriction}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {restriction}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Allergies Input Form */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Allergies
            </label>
            <form onSubmit={handleAllergySubmit} className="flex gap-2">
              <input
                type="text"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                placeholder="Enter an allergy..."
                className="flex-1 p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add
              </button>
            </form>
            {allergies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {allergies.map(allergy => (
                  <span
                    key={allergy}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                  >
                    {allergy}
                    <button
                      onClick={() => removeAllergy(allergy)}
                      className="ml-2 focus:outline-none"
                    >
                      <X size={14} className="hover:text-red-600" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Additional Elements */}
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