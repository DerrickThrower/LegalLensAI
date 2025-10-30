import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { analysis, originalText } = location.state || {};
  
  useEffect(() => {
    if (!analysis) {
      setError('No analysis data available');
    } else if (analysis.summary.startsWith('Error:') || analysis.summary.startsWith('An error occurred:')) {
      setError(analysis.summary);
    }
    setLoading(false);
  }, [analysis]);

  const handleReanalyze = () => {
    navigate('/analyzer', { state: { previousText: originalText } });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full text-center">
          <p className="text-gray-600">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Analysis Error</h1>
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
            <p className="text-red-700">{error}</p>
          </div>
          <div className="flex justify-between">
            <button 
              onClick={() => navigate('/analyzer')}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Analyzer
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Simplified Results</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{analysis?.summary || "No summary available"}</p>
        </div>
        
        {analysis?.concerns && analysis.concerns.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Potential Concerns</h2>
            <ul className="space-y-2">
              {analysis.concerns.map((concern, index) => (
                <li key={index} className="border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-50 rounded-r-lg">
                  <span className="font-bold">{concern.type}:</span> {concern.details}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex justify-between">
          <button 
            onClick={() => navigate('/analyzer')} 
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results; 