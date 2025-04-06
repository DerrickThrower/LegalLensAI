import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Analyzer from './routes/Analyzer';
import Results from './routes/Results';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/results" element={<Results />} />
      
      </Routes>
    </Router>
  );
};

export default App; 