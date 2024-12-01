import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [allergyInput, setAllergyInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem('user_email');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userEmail) {
          throw new Error('User not logged in');
        }

        const response = await axios.get('http://localhost:8000/api/user', {
          params: { user_email: userEmail },
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
      // Update the UI immediately without calling the backend
      setUserData((prev) => ({
        ...prev,
        allergies: [...(prev.allergies || []), allergyInput.trim()],
      }));
      setAllergyInput(''); // Clear the input field
    }
  };

  const removeAllergy = (allergy) => {
    // Remove allergy from the displayed list without calling the backend
    setUserData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((item) => item !== allergy),
    }));
  };

  if (loading) {
    return <div className="text-center p-6 text-gray-600">Loading user data...</div>;
  }

  if (!userData) {
    return <div className="text-center p-6 text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="bg-light-spotifyGreen shadow-lg rounded-lg overflow-hidden">
        {/* Profile Picture and Welcome Section with Background Image and Dark Overlay */}
        <div
          className="relative flex items-center space-x-6 p-12 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: 'url("https://shapeyourfutureok.com/wp-content/uploads/2018/10/25698-TSET-19-04-SYF-Website-Refresh_Header_5FoodGroups_F.jpg")' }} // Replace with your image URL
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white">Welcome, {userData.first_name || 'User'}!</h1>
            <p className="text-white text-lg font-light">Slice your grocery bill and reduce food waste.</p>
          </div>
        </div>

        {/* User Details Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Details</h2>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Email:</strong> {userData.email || 'Not available'}
          </p>

          {/* Allergies Section */}
          <div className="mb-6">
            <label className="block text-xl text-gray-900 font-semibold mb-4">Allergies</label>
            <form onSubmit={handleAllergySubmit} className="flex gap-4 mb-6 items-center">
              <input
                type="text"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                placeholder="Enter an allergy..."
                className="flex-grow p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-spotifyGreen shadow-md"
                style={{ fontSize: '16px' }}
              />
              <button
                type="submit"
                className="p-3 text-sm font-semibold rounded-md text-white bg-spotifyGreen hover:bg-dark-spotifyGreen transition-all shadow-lg"
                style={{ height: '48px', paddingLeft: '40px', paddingRight: '40px' }} // Ensure height matches input and add padding for length
              >
                Add
              </button>
            </form>
            <div className="flex flex-wrap gap-3">
              {userData.allergies?.length ? (
                userData.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-spotifyGreen text-white shadow-sm"
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
                <p className="text-gray-400">No allergies listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;