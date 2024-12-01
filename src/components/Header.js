import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Book, ShoppingCart, LineChart } from 'lucide-react';
import axios from 'axios';

function HeaderNav({ loggedIn }) {
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

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
    { id: 'grocery-list', icon: ShoppingCart, label: 'Lists', path: '/grocery-list' },
    { id: 'recipe-book', icon: Book, label: 'Recipes', path: '/recipe-book' },
    // { id: 'price-comparison', icon: LineChart, label: 'Prices', path: '/price-comparison' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-20">
      <div className="w-full px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between font-inter border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Chop N' Shop</h1>
        <div className="flex items-center justify-end">
          {loggedIn && (
            <div className="text-sm text-gray-600">
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
      <nav className="bg-white px-4">
        <div className="max-w-7xl mx-auto flex justify-around py-2">
          {navItems.map(({ id, icon: Icon, label, path }) => (
            <Link
              key={id}
              to={path}
              className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default HeaderNav;