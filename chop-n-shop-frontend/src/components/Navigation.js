import React from 'react';
import { Home, User, Book, ShoppingCart, LineChart } from 'lucide-react';

function Navigation({ onNavigate, currentPage }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'grocery-list', icon: ShoppingCart, label: 'Lists' },
    { id: 'recipe-book', icon: Book, label: 'Recipes' },
    { id: 'price-comparison', icon: LineChart, label: 'Prices' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors
                ${currentPage === id 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'}`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;