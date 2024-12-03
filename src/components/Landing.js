import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../chopnshop.png'; // Ensure this path is correct

const LandingPage = ({ onVisit }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-spotifyBlack flex flex-col items-center justify-center font-inter">
      <img src={logo} alt="Chop N' Shop Logo" className="w-[300px] h-[300px] animate-slide-in mb-6" /> {/* Adjusted size and applied animation class */}
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Chop N' Shop</h1>
      <p className="text-lg text-gray-600 dark:text-spotifyGray mb-6">Your smart and easy grocery shopping assistant.</p>
      <Link
        to="/login"
        onClick={onVisit}
        className="px-8 py-3 bg-gradient-to-r from-spotifyGreen to-green-500 text-white rounded-lg hover:shadow-md"
      >
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;