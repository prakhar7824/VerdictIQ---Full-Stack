import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/modern-styles.css';

// Import pages
import Home from './pages/Home';
import UploadPage from './pages/UploadPage';
import PrecedentFinder from './pages/PrecedentFinder';
import Login from './pages/Login';
import Register from './pages/Register';
import PredictionPage from './pages/PredictionPage';
import SummarizePage from './pages/SummarizePage';
import CaseClassificationPage from './pages/CaseClassificationPage';
import LanguagePage from './pages/LanguagePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/precedents" element={<PrecedentFinder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/summarize" element={<SummarizePage />} />
        <Route path="/classify" element={<CaseClassificationPage />} />
        <Route path="/languages" element={<LanguagePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
