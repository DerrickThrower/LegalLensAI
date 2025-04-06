import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">LegalLensAI</h1>
        <p className="text-gray-600 text-center mb-6">Simplify your terms of service so you don't need to just skip right over it</p>
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/analyzer')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 