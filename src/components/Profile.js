import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../App.css';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [allergyInput, setAllergyInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch user email from localStorage
  const userEmail = localStorage.getItem('user_email'); // Make sure email is stored during login

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userEmail) {
          throw new Error('User not logged in');
        }

        const response = await axios.get('http://localhost:8000/api/user', {
          params: { user_email: userEmail }, // Dynamically use logged-in email
        });

        setUserData(response.data);
      } catch (error) {
        setErrorMessage(error.response?.data?.detail || error.message || 'Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleAllergySubmit = (e) => {
    e.preventDefault();
    if (allergyInput.trim() && !userData?.allergies.includes(allergyInput.trim())) {
      setUserData((prev) => ({
        ...prev,
        allergies: [...(prev.allergies || []), allergyInput.trim()],
      }));
      setAllergyInput('');
    }
  };

  const removeAllergy = (allergy) => {
    setUserData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((item) => item !== allergy),
    }));
  };

  if (loading) {
    return <div className="text-center p-6">Loading user data...</div>;
  }

  if (!userData) {
    return <div className="text-center p-6 text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Picture and Info Section */}
        <div className="flex items-center space-x-6 p-12 bg-gradient-to-r from-green-400 to-blue-500">
          <img
            className="w-24 h-24 rounded-full border-4 border-white"
            src={userData.profileImage || '/placeholder-image.jpg'} // Dynamic placeholder
            alt="Profile"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, {userData.first_name || 'User'}!</h1>
            <p className="text-white">Slice your grocery bill and food waste.</p>
          </div>
        </div>

        {/* Display User Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <p><strong>Email:</strong> {userData.email || 'Not available'}</p>
          <p><strong>Budget:</strong> ${userData.Budget ?? 'Not set'}</p>

          {/* Dietary Restrictions */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Dietary Restrictions</label>
            <div className="flex flex-wrap gap-2">
              {userData.dietary_restrictions?.length ? (
                userData.dietary_restrictions.map((restriction, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {restriction}
                  </span>
                ))
              ) : (
                <p>No dietary restrictions listed.</p>
              )}
            </div>
          </div>

          {/* Allergies */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Allergies</label>
            <form onSubmit={handleAllergySubmit} className="flex gap-2 mb-4">
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
            <div className="flex flex-wrap gap-2">
              {userData.allergies?.length ? (
                userData.allergies.map((allergy, index) => (
                  <span
                    key={index}
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
                ))
              ) : (
                <p>No allergies listed.</p>
              )}
            </div>
          </div>

          {/* Preferred Stores */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Preferred Stores</label>
            <div className="flex flex-wrap gap-2">
              {userData.preferred_stores?.length ? (
                userData.preferred_stores.map((store, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                  >
                    {store}
                  </span>
                ))
              ) : (
                <p>No preferred stores listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
