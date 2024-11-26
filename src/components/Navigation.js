import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Book, ShoppingCart, LineChart } from 'lucide-react';

function Navigation() {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
    { id: 'grocery-list', icon: ShoppingCart, label: 'Lists', path: '/grocery-list' },
    { id: 'recipe-book', icon: Book, label: 'Recipes', path: '/recipe-book' },
    // { id: 'price-comparison', icon: LineChart, label: 'Prices', path: '/price-comparison' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-2">
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
      </div>
    </nav>
  );
}

export default Navigation;
