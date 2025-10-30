import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config';

const API_KEY = config.GEMINI_API_KEY;
console.log('API Key status:', API_KEY ? 'Key is present' : 'Key is missing');

let genAI = null;
try {
  genAI = new GoogleGenerativeAI(API_KEY);
  console.log('Gemini AI client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Gemini AI client:', error);
}

export async function analyzeTermsOfService(text) {
  if (!genAI) {
    console.error('Gemini AI client not initialized');
    return {
      summary: "Error: API client not initialized. Please check your API key.",
      concerns: []
    };
  }

  if (!text || text.trim().length < 10) {
    return {
      summary: "Please provide a longer text to analyze.",
      concerns: []
    };
  }

  try {
    console.log('Requesting analysis from Gemini AI...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `
      Please analyze the following Terms of Service text and provide:
      1. A simplified summary (2-3 sentences) that explains the key points in plain language
      2. A list of potential concerns that a user should be aware of (e.g., privacy issues, cancelation policies, data sharing)
      
      Format the response as a JSON object with the following structure:
      {
        "summary": "The simplified summary goes here",
        "concerns": [
          {
            "type": "Category of concern",
            "details": "Explanation of the concern"
          }
        ]
      }
      
      Terms of Service text to analyze:
      ${text.substring(0, 1500)}...
    `;
    
    const generationConfig = {
      temperature: 0.4,
      topK: 32,
      topP: 0.95,
      maxOutputTokens: 1024,
    };
    
    const safetySettings = [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ];
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings
    });
    
    const response = await result.response;
    const textResponse = response.text();
    console.log('Received response from Gemini AI');
    
    try {
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedResult = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed response');
        return parsedResult;
      }
      
      console.error('Failed to extract JSON pattern from response');
      return {
        summary: textResponse.substring(0, 200) + "...",
        concerns: [{ type: "Processing Error", details: "Could not structure the response properly" }]
      };
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return {
        summary: "Failed to parse AI response. Please try again with a different text.",
        concerns: [{ type: "Processing Error", details: parseError.message }]
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      summary: `An error occurred: ${error.message}`,
      concerns: [{ type: "API Error", details: "There was a problem connecting to the AI service" }]
    };
  }
} 