# Legal Lens Chrome Extension

A Chrome extension that simplifies terms of service agreements using Gemini AI.

## Features

- Simple, clean interface built with React and Tailwind CSS
- Analyzes terms of service text using Google's Gemini AI
- Provides a simplified summary and highlights potential concerns
- Easy to use with intuitive navigation

## Setup Instructions

### API Key Setup

1. Get a Gemini AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the root directory
3. Add your API key to the `.env` file:
   ```
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```

### Development

1. Install dependencies:
   ```
   npm install
   ```

2. Build the extension:
   ```
   npm run build
   ```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the upper right corner)
   - Click "Load unpacked" and select this directory
   - The extension should appear in your toolbar

4. For development with auto-rebuild:
   ```
   npm run dev
   ```

## Usage

1. Click the Legal Lens extension icon in your browser
2. Click "Get Started" to begin
3. Paste your terms of service text into the analyzer
4. Click "Analyze" to receive a simplified summary and list of potential concerns
5. Navigate back to analyze more text or return to the home screen

## Technologies Used

- React for UI components
- React Router for navigation
- Tailwind CSS for styling
- Google's Gemini AI for text analysis
- Webpack for bundling