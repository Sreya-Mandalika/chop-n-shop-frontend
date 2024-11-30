import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Header({ loggedIn }) {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userEmail = localStorage.getItem('user_email');
        if (!userEmail) {
          setError('User not logged in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8000/api/user', {
          params: { user_email: userEmail },
        });

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
  }, []); 

  return (
    <header className="bg-white dark:bg-spotifyBlack shadow-md mb-6">
      <div className="w-full px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between font-inter">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex-grow">Chop N' Shop</h1>
        <div className="flex items-center justify-end">
          {loggedIn && (
            <div className="text-sm text-gray-600 dark:text-spotifyGray">
              {loading ? (
                'Loading...'
              ) : error ? (
                <span className="text-red-500">{error}</span>
              ) : (
                <>
                  Welcome, <span className="font-medium">{userName}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;