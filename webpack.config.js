const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');

const currentPath = path.join(__dirname);
const envPath = currentPath + '/.env';
const envExists = fs.existsSync(envPath);

let env = {};
if (envExists) {
  console.log('.env file found, loading environment variables');
  const parsedEnv = dotenv.config({ path: envPath }).parsed;
  env = parsedEnv || {};
} else {
  console.log('.env file not found, using process.env');
  if (process.env.REACT_APP_GEMINI_API_KEY) {
    env.REACT_APP_GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    console.log('Found REACT_APP_GEMINI_API_KEY in process.env');
  } else {
    console.log('Warning: No API key found in environment');
  }
}

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

console.log('Environment keys loaded:', Object.keys(envKeys));

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ]
}; 