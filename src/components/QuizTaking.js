import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizTaking() {
    const quizQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(45);
    const [timerStarted, setTimerStarted] = useState(false);
    const [answerSelected, setAnswerSelected] = useState(false);
    const navigate = useNavigate();

    // Start the timer on initial render, it fixes the first question timer issue.
    useEffect(() => {
        setTimerStarted(true);
    }, []);

    useEffect(() => {
        if (timerStarted) {
            if (timeLeft === 0) {
                nextQuestion();
            }
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, timerStarted]);

    const handleAnswerSelect = (answer) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(newAnswers);
        setAnswerSelected(true); // Mark as selected
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(45); // Reset timer for new question
            setTimerStarted(true); // Start timer
            setAnswerSelected(false); // Reset answer selected for the next question
        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        let score = 0;
        quizQuestions.forEach((question, index) => {
            if (question.correct === selectedAnswers[index]) {
                score += 1;
            }
        });
        localStorage.setItem('quizScore', score);
        navigate('/result');
    };

    if (quizQuestions.length === 0) return <div>No quiz available</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Quiz</h1>
            <div className="mb-4">
                <p className="mb-2">{quizQuestions[currentQuestionIndex].question}</p>
                {quizQuestions[currentQuestionIndex].options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswerSelect(option)}
                        className={`block w-full p-2 mb-2  border-2 border-gray-200  ${selectedAnswers[currentQuestionIndex] === option ? 'bg-blue-300' : ''}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <p className={`mb-4 text-xl ${timeLeft <= 15 ? 'text-red-600' : ''}`}>Time left: {timeLeft} seconds</p>

            {/* Disable "Next" button if no answer is selected */}
            <button
                onClick={nextQuestion}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${!answerSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!answerSelected} // Button is disabled until an option is selected
            >
                Next
            </button>
        </div>
    );
}

export default QuizTaking;

