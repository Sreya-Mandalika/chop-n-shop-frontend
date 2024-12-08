import React, { useState } from 'react';
import { LucideUser, LucideKey } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../Css/UserLogin.css';
const API = process.env.REACT_APP_BACKEND_URL;
console.log(API);


const UserLogin = ({ onLoginOrSignup }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    allergies: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (isNewUser) {
        const response = await fetch(`${API}/register/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage('Registration successful! Please log in.');
          setIsNewUser(false);
          setFormData({
            email: '',
            password: '',
            first_name: '',
            allergies: '',
          });
        } else {
          setError(data.detail || 'Registration failed');
        }
      } else {
        const response = await fetch(`${API}/login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('user_email', formData.email);
          localStorage.setItem('user_name', data.first_name || ''); // Save user's name
          localStorage.setItem('token', data.access_token); // Save token
          setSuccessMessage('Login successful!');
          onLoginOrSignup(data);
          navigate('/home'); // Navigate to home page
        } else {
          setError(data.detail || 'Login failed');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-wrapper min-h-screen flex items-center justify-center">
      <div className="form-container bg-white p-8 rounded-lg shadow-xl w-full max-w-md bg-opacity-90">
        <h2 className="text-2xl font-bold mb-6 text-center">{isNewUser ? 'Create an Account' : 'Login'}</h2>

        <form onSubmit={handleSubmit}>
          {isNewUser && (
            <>
              <div className="mb-4">
                <label htmlFor="first_name" className="block font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="allergies" className="block font-medium text-gray-700 mb-1">
                  Allergies
                </label>
                <input
                  type="text"
                  id="allergies"
                  name="allergies"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

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

          <div className="mb-4">
            {loading && <div className="text-center text-blue-500">Processing...</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}
            {error && <div className="text-red-500">{error}</div>}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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