import React from 'react';

function Header({ loggedIn, userName }) {
  return (
    <header className="bg-white shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Grocery Helper</h1>
        {loggedIn && (
          <span className="text-sm text-gray-600">
            Welcome, <span className="font-medium">{userName}</span>
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;