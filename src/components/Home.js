import React from 'react';
import { Plus, Clock } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from React Router

function Home({ groceryData }) {
  return (
    <div className="space-y-6 p-4">
      {/* Welcome Banner with Background Image */}
      <div 
        className="bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
        style={{ backgroundImage: 'url("https://shapeyourfutureok.com/wp-content/uploads/2018/10/25698-TSET-19-04-SYF-Website-Refresh_Header_5FoodGroups_F.jpg")' }}  // Replace with your image URL
      >
        <div className="flex items-center space-x-6 p-8 bg-black bg-opacity-40">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome to Chop N' Shop!</h1>
            <p className="text-lg text-white opacity-90">
              Let's make grocery shopping smarter and easier.
            </p>
            <div className="flex gap-2 mt-3">
              <span className="bg-white bg-opacity-20 text-white px-4 py-1 rounded-full text-sm shadow">
                Save Money
              </span>
              <span className="bg-white bg-opacity-20 text-white px-4 py-1 rounded-full text-sm shadow">
                Reduce Waste
              </span>
              <span className="bg-white bg-opacity-20 text-white px-4 py-1 rounded-full text-sm shadow">
                Eat Better
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Current List Section */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Current Shopping List</h2>
          <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-md">
            <Plus className="h-5 w-5" />
            <span>New</span>
          </button>
        </div>

        {Object.entries(groceryData.stores).map(([store, data]) => (
          <div key={store} className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">{store}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {data.items.map((item, index) => (
                <div
                  key={index}
                  className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
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
            <div className="px-6 py-4 bg-gray-100 rounded-b-lg">
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

      {/* Quick Actions Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Link to Grocery List Page */}
            <Link to="/grocery-list">
              <button className="p-6 w-full border rounded-lg text-left bg-gray-50 hover:bg-gray-100 shadow-md text-lg font-semibold">
                <h3 className="font-medium text-gray-900">Create a Grocery List</h3>
                <p className="text-sm text-gray-600">Find the best deals</p>
              </button>
            </Link>
            {/* Link to Recipe Book Page */}
            <Link to="/recipe-book">
              <button className="p-6 w-full border rounded-lg text-left bg-gray-50 hover:bg-gray-100 shadow-md text-lg font-semibold">
                <h3 className="font-medium text-gray-900">Browse Recipe Book</h3>
                <p className="text-sm text-gray-600">Get cooking inspiration</p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">Weekly Groceries</p>
                <p className="text-sm text-gray-600">Created new list</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">Pasta Recipe</p>
                <p className="text-sm text-gray-600">Added to saved recipes</p>
              </div>
              <span className="text-sm text-gray-500">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
