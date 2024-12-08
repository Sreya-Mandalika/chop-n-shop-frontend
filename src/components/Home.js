import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for fetching user data
const API = "https://chop-n-shop-backend-534070775559.us-central1.run.app"

function Home({ groceryData }) {
  const [userName, setUserName] = useState(''); // State to store the user's name

  useEffect(() => {
    // Fetch the user's name
    const fetchUserName = async () => {
      try {
        const userEmail = localStorage.getItem('user_email');
        if (!userEmail) return;

        const response = await axios.get(`${API}/api/user`, {
          params: { user_email: userEmail },
        });

        const { first_name } = response.data;
        setUserName(first_name || 'User');
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };

    fetchUserName();

    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-fade-in-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on mount to catch any elements already in view

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="font-inter bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("https://wallpapers.com/images/hd/color-scheme-vegetables-and-fruits-7mq9envdlh3ul5za.jpg")' }}  // Replace with your image URL
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 animate-slide-in">Welcome to Chop N' Shop, {userName}!</h1>
          <p className="text-xl mb-8 animate-slide-in">Let's make grocery shopping smarter and easier.</p>
          <div className="flex gap-2 justify-center">
            <span className="bg-spotifyGreen text-white px-4 py-2 rounded-full text-sm shadow">
              Save Money
            </span>
            <span className="bg-spotifyGreen text-white px-4 py-2 rounded-full text-sm shadow">
              Reduce Waste
            </span>
            <span className="bg-spotifyGreen text-white px-4 py-2 rounded-full text-sm shadow">
              Eat Better
            </span>
          </div>
          <div className="mt-12 animate-bounce">
            <a href="#main-content" className="text-lg underline">Scroll down to get started</a>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="main-content" className="p-4 space-y-6">
        {/* Current List Section */}
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-on-scroll">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold text-gray-800">Current Shopping List</h2>
            <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-spotifyGreen text-white rounded-lg hover:shadow-md">
              <Plus className="h-5 w-5" />
              <span>New</span>
            </button>
          </div>

          {Object.entries(groceryData.stores).map(([store, data]) => (
            <div key={store} className="bg-white rounded-lg shadow-md animate-fade-in-on-scroll">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-800">{store}</h3>
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
        <div className="max-w-7xl mx-auto animate-fade-in-on-scroll">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Link to Grocery List Page */}
              <Link to="/grocery-list">
                <button className="p-6 w-full border rounded-lg text-left bg-gray-50 hover:bg-gray-100 transition">
                  <h3 className="text-2xl font-semibold text-gray-800">Grocery List</h3>
                  <p className="text-gray-600">Manage your current shopping list.</p>
                </button>
              </Link>

              {/* Link to Recipe Book Page */}
              <Link to="/recipe-book">
                <button className="p-6 w-full border rounded-lg text-left bg-gray-50 hover:bg-gray-100 transition">
                  <h3 className="text-2xl font-semibold text-gray-800">Recipe Book</h3>
                  <p className="text-gray-600">Browse and add your favorite recipes.</p>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="max-w-7xl mx-auto animate-fade-in-on-scroll">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            {/* Add your recent activity content here */}
            <div className="space-y-4">
              {/* Example of a recent activity item */}
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-gray-700"><strong>New List Created:</strong> Weekly Groceries</p>
                <span className="text-gray-500 text-sm">2 days ago</span>
              </div>
              {/* Add more recent activity items as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;