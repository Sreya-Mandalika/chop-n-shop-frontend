import React, { useState } from 'react';
import { LucideUser, LucideKey} from 'lucide-react';

const UserLogin = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    dietaryPreferences: '',
    allergens: '',
    preferredStores: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login or signup logic here
    console.log('Form data:', formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">
          {isNewUser ? 'Create an Account' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit}>
          {isNewUser && (
            <>
              <div className="mb-4">
                <label htmlFor="firstName" className="block font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <LucideUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="dietaryPreferences" className="block font-medium text-gray-700 mb-1">
                  Dietary Preferences
                </label>
                <input
                  type="text"
                  id="dietaryPreferences"
                  name="dietaryPreferences"
                  className="pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your dietary preferences"
                  value={formData.dietaryPreferences}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="allergens" className="block font-medium text-gray-700 mb-1">
                  Allergens
                </label>
                <input
                  type="text"
                  id="allergens"
                  name="allergens"
                  className="pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your allergens"
                  value={formData.allergens}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="preferredStores" className="block font-medium text-gray-700 mb-1">
                  Preferred Stores
                </label>
                <select
                  id="preferredStores"
                  name="preferredStores"
                  className="pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.preferredStores}
                  onChange={handleInputChange}
                >
                  <option value="">Select preferred stores</option>
                  <option value="wholeGoods">Whole Goods</option>
                  <option value="traderJoes">Trader Joe's</option>
                  <option value="neither">Neither</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <LucideUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <LucideKey className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isNewUser ? 'Create Account' : 'Login'}
          </button>

          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsNewUser(!isNewUser)}
            >
              {isNewUser ? 'Already have an account? Login' : 'New user? Create an account'}
            </button>
            {!isNewUser && (
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 focus:outline-none"
              >
                Forgot password?
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;