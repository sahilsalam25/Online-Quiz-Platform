import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizCreation() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const addQuestion = () => {
        if (currentQuestion && currentOptions.every(option => option) && correctAnswer) {
            setQuestions([...questions, { question: currentQuestion, options: currentOptions, correct: correctAnswer }]);
            setCurrentQuestion('');
            setCurrentOptions(['', '', '', '']);
            setCorrectAnswer('');
            setError('');
        } else {
            setError('Please fill out all fields.');
        }
    };

    const startQuiz = () => {
        if (questions.length > 0) {
            localStorage.setItem('quizQuestions', JSON.stringify(questions));
            navigate('/quiz-taking');
        } else {
            setError('Add at least one question to start the quiz.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">Create Your Quiz</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Enter the question"
                className="w-full p-2 border mb-4"
            />
            {currentOptions.map((option, idx) => (
                <input
                    key={idx}
                    type="text"
                    value={option}
                    onChange={(e) => {
                        const newOptions = [...currentOptions];
                        newOptions[idx] = e.target.value;
                        setCurrentOptions(newOptions);
                    }}
                    placeholder={`Option ${idx + 1}`}
                    className="w-full p-2 border mb-2"
                />
            ))}
            <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter the correct answer"
                className="w-full p-2 border mb-4"
            />
            <button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600">Add Question</button>
            <button onClick={startQuiz} className="bg-green-500 text-white px-4 py-2 rounded mx-3 hover:bg-green-600">Start Quiz</button>
        </div>
    );
}

export default QuizCreation;
