import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.REACT_APP_API_URL;

function Register({ onRegister }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [budget, setBudget] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [allergies, setAllergies] = useState('');
  const [foodRequest, setFoodRequest] = useState('');
  const [preferredStores, setPreferredStores] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/Register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          email,
          password,
          budget: parseFloat(budget), 
          dietary_restrictions: dietaryRestrictions,
          allergies,
          food_request: foodRequest,
          preferred_stores: preferredStores,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log("Registration Successful:", data);
        onRegister(); 
        navigate('/dashboard'); 
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dietary Restrictions (comma-separated)"
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
      />
      <input
        type="text"
        placeholder="Allergies (comma-separated)"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
      />
      <input
        type="text"
        placeholder="Food Request (comma-separated)"
        value={foodRequest}
        onChange={(e) => setFoodRequest(e.target.value)}
      />
      <input
        type="text"
        placeholder="Preferred Stores (comma-separated)"
        value={preferredStores}
        onChange={(e) => setPreferredStores(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
