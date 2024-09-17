import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizCreation from './components/QuizCreation';
import QuizTaking from './components/QuizTaking';
import Result from './components/Result';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<QuizCreation />} />
          <Route path="/quiz-taking" element={<QuizTaking />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

