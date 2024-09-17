import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Result() {
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const quizQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
        const quizScore = localStorage.getItem('quizScore') || 0;

        setScore(parseInt(quizScore));
        setTotalQuestions(quizQuestions.length);

        // Calculate correct and wrong answers
        const correct = parseInt(quizScore);
        const wrong = quizQuestions.length - correct;

        setCorrectAnswers(correct);
        setWrongAnswers(wrong);
        setPercentage(((correct / quizQuestions.length) * 100).toFixed(2));
    }, []);

    const retakeQuiz = () => {
        navigate('/');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Quiz Result</h1>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
                <p className="text-xl font-semibold mb-2">Your Score: {score}/{totalQuestions}</p>
                <p className="text-lg mb-2 text-green-600">Correct Answers: {correctAnswers}</p>
                <p className="text-lg mb-2 text-red-500">Wrong Answers: {wrongAnswers}</p>
                <p className="text-lg mb-4 text-blue-500">Percentage: {percentage} %</p>

                {/* Display feedback based on performance */}
                <div className="mb-4">
                    {percentage >= 80 && (
                        <p className="text-xl font-semibold text-green-600">Great Job! 🎉</p>
                    )}
                    {percentage >= 50 && percentage < 80 && (
                        <p className="text-xl font-semibold text-yellow-500">Good Effort! 👍</p>
                    )}
                    {percentage < 50 && (
                        <p className="text-xl font-semibold text-red-600">Keep Practicing! 💡</p>

                    )}
                </div>

                <div className="text-center">
                    <button
                        onClick={retakeQuiz}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Retake Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Result;
