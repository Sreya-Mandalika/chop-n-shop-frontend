import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Book, ShoppingCart } from 'lucide-react';


function Navigation() {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
    { id: 'grocery-list', icon: ShoppingCart, label: 'Lists', path: '/grocery-list' },
    { id: 'recipe-book', icon: Book, label: 'Recipes', path: '/recipe-book' },
    // { id: 'price-comparison', icon: LineChart, label: 'Prices', path: '/price-comparison' }
    // testing something here
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-20">
      <div className="w-full px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between font-inter border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Chop N' Shop</h1>
        <nav className="flex justify-around flex-1 max-w-7xl mx-auto px-4 py-2">
          {navItems.map(({ id, icon: Icon, label, path }) => (
            <Link
              key={id}
              to={path}
              className="flex flex-col items-center px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out transform hover:bg-green-500 hover:text-white hover:scale-105"
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navigation;