try {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
} catch (error) {
  console.error('Error loading dotenv:', error);
}

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
console.log('Environment check:', {
  apiKeyExists: !!apiKey,
  nodeEnv: process.env.NODE_ENV || 'not set'
});

const config = {
  GEMINI_API_KEY: apiKey || 'DEMO_KEY',
};

if (!apiKey) {
  console.warn('WARNING: No Gemini API key found in environment variables. The application will not function correctly.');
}

export default config; 