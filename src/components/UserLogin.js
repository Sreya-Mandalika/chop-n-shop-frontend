import React, { useState } from 'react';
import { LucideUser, LucideKey } from 'lucide-react';

const UserLogin = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    dietaryPreferences: [],
    allergens: '',
    preferredStores: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If it's a new user, register them; otherwise, log in
    if (isNewUser) {
      // Implement the registration logic here
      console.log('Registering user:', formData);
    } else {
      try {
        const response = await fetch('http://localhost:8000/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage('Login successful!');
          setError('');
          console.log(data);  // Handle successful login response here
        } else {
          setError(data.detail || 'Login failed');
          setSuccessMessage('');
        }
      } catch (err) {
        setError('An error occurred during login');
        setSuccessMessage('');
        console.error(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">{isNewUser ? 'Create an Account' : 'Login'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isNewUser && (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <LucideUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <LucideKey className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* Add other input fields here if needed */}
          
          <div className="mb-4">
            {successMessage && <div className="text-green-500">{successMessage}</div>}
            {error && <div className="text-red-500">{error}</div>}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isNewUser ? 'Create Account' : 'Login'}
            </button>
          </div>

          <div className="text-center">
            <p
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsNewUser(!isNewUser)}
            >
              {isNewUser ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
