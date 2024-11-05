import React from 'react';
import { Calendar } from 'lucide-react';

function GroceryList() {
  const previousLists = [
    {
      id: 1,
      date: '2024-03-28',
      stores: ['Trader Joe\'s', 'Whole Foods'],
      total: 84.52
    },
    {
      id: 2,
      date: '2024-03-21',
      stores: ['Kroger'],
      total: 56.23
    },
    {
      id: 3,
      date: '2024-03-14',
      stores: ['Trader Joe\'s', 'Walmart'],
      total: 92.15
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Shopping Lists History</h1>
        <p className="text-gray-600">
          View and manage your past shopping lists. Track your spending patterns and reuse previous lists for faster shopping.
        </p>
      </div>

      <div className="space-y-4">
        {previousLists.map(list => (
          <div key={list.id} className="bg-white rounded-lg shadow">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {new Date(list.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {list.stores.join(', ')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${list.total.toFixed(2)}</p>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroceryList;