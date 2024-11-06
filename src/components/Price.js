import React, { useState } from 'react';
const mockGroceryLists = [
  {
    name: 'Weekly Groceries',
    items: [
      { name: 'Milk', quantity: 1 },
      { name: 'Bread', quantity: 2 },
      { name: 'Eggs', quantity: 1 }
    ]
  },
  {
    name: 'Monthly Essentials',
    items: [
      { name: 'Rice', quantity: 5 },
      { name: 'Pasta', quantity: 2 },
      { name: 'Tomato Sauce', quantity: 3 }
    ]
  }
];
const mockStores = {
  Walmart: {
    Milk: 3.99,
    Bread: 2.49,
    Eggs: 4.99,
    Rice: 6.99,
    Pasta: 1.29,
    'Tomato Sauce': 1.99
  },
  Target: {
    Milk: 4.19,
    Bread: 2.59,
    Eggs: 4.89,
    Rice: 6.49,
    Pasta: 1.19,
    'Tomato Sauce': 2.09
  }
};
function PriceComparison() {
  const [selectedGroceryList, setSelectedGroceryList] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [comparisonType, setComparisonType] = useState('list');
  const handleGroceryListChange = (e) => {
    const listName = e.target.value;
    const groceryList = mockGroceryLists.find(list => list.name === listName);
    setSelectedGroceryList(groceryList);
  };
  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };
  const calculateTotalPriceForList = (store) => {
    if (!selectedGroceryList) return 0;
    return selectedGroceryList.items.reduce((total, item) => {
      const itemPrice = mockStores[store][item.name];
      return itemPrice ? total + itemPrice * item.quantity : total;
    }, 0);
  };
  const getPricesForListComparison = () => {
    const storeTotals = Object.keys(mockStores).map(store => ({
      store,
      total: calculateTotalPriceForList(store)
    }));
    const cheapestStore = storeTotals.reduce((acc, store) => {
      return store.total < acc.total ? store : acc;
    }, { store: null, total: Infinity });
    return { storeTotals, cheapestStore };
  };
  const getPricesForProductComparison = () => {
    const storePrices = Object.keys(mockStores).map(store => ({
      store,
      price: mockStores[store][selectedProduct] || null
    })).filter(store => store.price !== null);
    const cheapestStore = storePrices.reduce((acc, store) => {
      return store.price < acc.price ? store : acc;
    }, { store: null, price: Infinity });
    return { storePrices, cheapestStore };
  };
  const { storeTotals, cheapestStore: cheapestListStore } = comparisonType === 'list' ? getPricesForListComparison() : {};
  const { storePrices, cheapestStore: cheapestProductStore } = comparisonType === 'product' ? getPricesForProductComparison() : {};
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Price Comparison</h1>
      <div className="mb-6">
        <label className="font-semibold text-gray-700">Comparison Type:</label>
        <select
          className="w-full mt-2 p-2 border rounded-lg"
          value={comparisonType}
          onChange={(e) => setComparisonType(e.target.value)}
        >
          <option value="list">Compare Grocery List</option>
          <option value="product">Compare Single Product</option>
        </select>
      </div>
      {comparisonType === 'list' && (
        <div className="mb-6">
          <label className="font-semibold text-gray-700">Choose Grocery List:</label>
          <select
            className="w-full mt-2 p-2 border rounded-lg"
            onChange={handleGroceryListChange}
          >
            <option value="">Select a list</option>
            {mockGroceryLists.map(list => (
              <option key={list.name} value={list.name}>{list.name}</option>
            ))}
          </select>
        </div>
      )}
      {comparisonType === 'product' && (
        <div className="mb-6">
          <label className="font-semibold text-gray-700">Choose Product:</label>
          <select
            className="w-full mt-2 p-2 border rounded-lg"
            onChange={handleProductChange}
          >
            <option value="">Select a product</option>
            {Object.keys(mockStores.Walmart).map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
      )}
      <div className="mt-6">
        {comparisonType === 'list' && storeTotals && (
          <>
            <h2 className="text-lg font-semibold mb-4">Price Comparison for Grocery List</h2>
            {storeTotals.map(store => (
              <div
                key={store.store}
                className={`p-4 border rounded-lg ${store.store === cheapestListStore.store ? 'bg-green-100' : 'bg-white'} mb-2`}
              >
                <p className="text-gray-900 font-semibold">{store.store}</p>
                <p>Total Price: ${store.total.toFixed(2)}</p>
                {store.store !== cheapestListStore.store && (
                  <p className="text-gray-600">Price Difference: +${(store.total - cheapestListStore.total).toFixed(2)}</p>
                )}
              </div>
            ))}
          </>
        )}
        {comparisonType === 'product' && storePrices && (
          <>
            <h2 className="text-lg font-semibold mb-4">Price Comparison for Product</h2>
            {storePrices.map(store => (
              <div
                key={store.store}
                className={`p-4 border rounded-lg ${store.store === cheapestProductStore.store ? 'bg-green-100' : 'bg-white'} mb-2`}
              >
                <p className="text-gray-900 font-semibold">{store.store}</p>
                <p>Price: ${store.price.toFixed(2)}</p>
                {store.store !== cheapestProductStore.store && (
                  <p className="text-gray-600">Price Difference: +${(store.price - cheapestProductStore.price).toFixed(2)}</p>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
export default PriceComparison;