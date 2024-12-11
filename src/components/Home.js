import React, { useEffect, useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || "https://chop-n-shop-backend-534070775559.us-central1.run.app";

function Home() {
  const [userName, setUserName] = useState('');
  const [userGroceryLists, setUserGroceryLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      const userEmail = localStorage.getItem('user_email');
      const token = localStorage.getItem('token');
      if (!userEmail || !token) return;

      const userResponse = await axios.get(`${API}/api/user`, {
        params: { user_email: userEmail },
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserName(userResponse.data.first_name || 'User');

      const listsResponse = await axios.get(`${API}/grocery_lists`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserGroceryLists(listsResponse.data.grocery_lists || []);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      // Implement user feedback for errors here
    }
  }, []);

  const handleScroll = useCallback(() => {
    const elements = document.querySelectorAll('.animate-fade-in-on-scroll');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        el.classList.add('visible');
      }
    });
  }, []);

  useEffect(() => {
    fetchUserData();
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchUserData, handleScroll]);

  const handleListClick = async (list) => {
    setLoading(true);
    setSelectedList(null);
    try {
      const listDetails = await new Promise((resolve) => {
        setTimeout(() => resolve(list), 1000);
      });
      setSelectedList(listDetails);
    } catch (error) {
      console.error('Failed to load list details:', error);
      // Implement user feedback for errors here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-inter bg-white min-h-screen">
      <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url("https://wallpapers.com/images/hd/color-scheme-vegetables-and-fruits-7mq9envdlh3ul5za.jpg")' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 animate-slide-in">Welcome to Chop N' Shop, {userName}!</h1>
          <p className="text-xl mb-8 animate-slide-in">Let's make grocery shopping smarter and easier.</p>
          <div className="flex gap-2 justify-center">
            <span className="bg-spotifyGreen text-white px-4 py-2 rounded-full text-sm shadow">Save Money</span>
            <span className="bg-spotifyGreen text-white px-4 py-2 rounded-full text-sm shadow">Reduce Waste</span>
            <span className="bg-spotifyGreen text-white px-4 py-2 rounded-full text-sm shadow">Eat Better</span>
          </div>
          <div className="mt-12 animate-bounce">
            <a href="#main-content" className="text-lg underline">Scroll down to get started</a>
          </div>
        </div>
      </div>

      <div id="main-content" className="p-4 space-y-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-on-scroll">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold text-gray-800">Your Grocery Lists</h2>
            <Link to="/grocery-list">
              <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-spotifyGreen text-white rounded-lg hover:shadow-md">
                <Plus className="h-5 w-5" />
                <span>New List</span>
              </button>
            </Link>
          </div>
          {userGroceryLists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userGroceryLists.map((list) => (
                <div key={list._id} className="bg-gray-50 rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50" onClick={() => handleListClick(list)}>
                  <h3 className="text-xl font-semibold text-gray-800">{list.list_name || 'Unnamed List'}</h3>
                  <p className="text-sm text-gray-500">{new Date(list.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No grocery lists available. Create a new one!</p>
          )}
        </div>

        {selectedList && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{selectedList.list_name || 'Unnamed List'}</h2>
              <div className="mt-4">
                {selectedList.grocery_list ? (
                  selectedList.grocery_list.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm text-gray-600 mb-2">
                      <span className="flex-grow">{item.item_name}</span>
                      <span className="w-20 text-right">${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  Object.entries(selectedList).map(([store, storeData]) => {
                    if (store !== '_id' && store !== 'list_name' && store !== 'created_at' && storeData.items) {
                      return (
                        <div key={store} className="mb-4">
                          <h3 className="text-xl font-semibold text-gray-800">{store}</h3>
                          <ul className="list-disc pl-5">
                            {storeData.items.map((item, idx) => (
                              <li key={idx} className="text-gray-600">
                                {item.item_name || item.Item_name}: ${parseFloat(item.price || item.Price).toFixed(2)}
                              </li>
                            ))}
                          </ul>
                          <p className="text-right font-semibold">
                            Total: ${parseFloat(storeData.Total_Cost).toFixed(2)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })
                )}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto animate-fade-in-on-scroll">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-6">
              <Link to="/grocery-list">
                <button className="p-6 w-full border rounded-lg text-left bg-gray-50 hover:bg-gray-100 transition">
                  <h3 className="text-2xl font-semibold text-gray-800">Grocery List</h3>
                  <p className="text-gray-600">Manage your current shopping list.</p>
                </button>
              </Link>
              <Link to="/recipe-book">
                <button className="p-6 w-full border rounded-lg text-left bg-gray-50 hover:bg-gray-100 transition">
                  <h3 className="text-2xl font-semibold text-gray-800">Recipe Book</h3>
                  <p className="text-gray-600">Browse and add your favorite recipes.</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
