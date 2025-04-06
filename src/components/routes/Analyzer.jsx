import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { analyzeTermsOfService } from '../../services/geminiService';
import config from '../../config';

const Analyzer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKeyStatus, setApiKeyStatus] = useState('');

  // Check API key on load
  useEffect(() => {
    const apiKey = config.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'DEMO_KEY') {
      setApiKeyStatus('missing');
      setError('API key is missing or invalid. Please check your .env file.');
    } else {
      setApiKeyStatus('present');
    }
  }, []);

  // Restore previous text if coming back from results
  useEffect(() => {
    if (location.state?.previousText) {
      setInputText(location.state.previousText);
    }
  }, [location.state]);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    if (apiKeyStatus === 'missing') {
      setError('Cannot analyze without a valid API key. Please set up your API key in the .env file.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Sending text for analysis, length:', inputText.length);
      const analysisResult = await analyzeTermsOfService(inputText);
      
      setIsLoading(false);
      
      if (analysisResult.summary.startsWith('Error:') || 
          analysisResult.summary.startsWith('An error occurred:')) {
        setError(analysisResult.summary);
        return;
      }
      
      navigate('/results', { state: { analysis: analysisResult, originalText: inputText } });
    } catch (error) {
      setIsLoading(false);
      setError(`Analysis failed: ${error.message}`);
      console.error('Analysis error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Analyze Terms of Service</h1>
        <p className="text-gray-600 text-center mb-6">Paste your terms of service text below to get a simplified summary</p>
        
        {apiKeyStatus === 'missing' && (
          <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-500 p-4">
            <p className="text-yellow-700">
              <strong>API Key Missing:</strong> Please add your Gemini API key to the .env file. See README for instructions.
            </p>
          </div>
        )}
        
        <div className="w-full mb-4">
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
            placeholder="Paste your terms of service text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm p-2 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>
          
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !inputText.trim() || apiKeyStatus === 'missing'}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 ${
              isLoading || !inputText.trim() || apiKeyStatus === 'missing' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analyzer; 