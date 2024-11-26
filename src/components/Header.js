import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Header({ loggedIn }) {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Retrieve the user's email from localStorage
        const userEmail = localStorage.getItem('user_email');
        if (!userEmail) {
          setError('User not logged in.');
          setLoading(false);
          return;
        }

        // Make a request to the backend to get user details
        const response = await axios.get('http://localhost:8000/api/user', {
          params: { user_email: userEmail },
        });

        // Extract and set the user's name
        const { first_name } = response.data;
        setUserName(first_name || 'User');
        setError('');
      } catch (err) {
        setError('Failed to fetch user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []); // Run once on mount

  return (
    <header className="bg-white shadow-md mb-6">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Chop N' Shop</h1>
        {loggedIn && (
          <span className="text-sm text-gray-600">
            {loading ? (
              'Loading...'
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <>
                Welcome, <span className="font-medium">{userName}</span>
              </>
            )}
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
