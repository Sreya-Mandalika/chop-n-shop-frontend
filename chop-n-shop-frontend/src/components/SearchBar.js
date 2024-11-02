import React, { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch, availableStores, onStoreFilter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search items..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select 
          value={selectedStore}
          onChange={(e) => {
            setSelectedStore(e.target.value);
            onStoreFilter(e.target.value);
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">All Stores</option>
          {availableStores.map(store => (
            <option key={store} value={store}>{store}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;