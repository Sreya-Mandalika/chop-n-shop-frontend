import React from 'react';

function GroceryList({ groceryData }) {
  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {Object.entries(groceryData.stores).map(([store, data]) => (
        <div key={store} className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{store}</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {data.items.map((item, index) => (
              <div key={index} className="px-6 py-4 flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="ml-2 text-sm text-gray-500">x{item.quantity}</span>
                </div>
                <span className="font-medium text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">
                ${data.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroceryList;