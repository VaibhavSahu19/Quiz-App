import Question from "./Question";
import React, { useEffect, useState } from "react";
import Confetti from 'react-confetti';

export default function Quiz(props) {
    let url;
    if (props.difficulty === "any" && props.category === "any") {
        url = "https://opentdb.com/api.php?amount=5&type=multiple";
    } else if (props.difficulty === "any") {
        url = `https://opentdb.com/api.php?amount=5&category=${props.category}&type=multiple`;
    } else if (props.category === "any") {
        url = `https://opentdb.com/api.php?amount=5&difficulty=${props.difficulty}&type=multiple`;
    } else {
        url = `https://opentdb.com/api.php?amount=5&category=${props.category}&difficulty=${props.difficulty}&type=multiple`;
    }

    const [userAnswers, setUsersAnswers] = useState([]);
    const [marks, setMarks] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [checkButton, setCheckButton] = useState("Check Answer");
    const [dataArray, setDataArray] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                setDataArray(responseData.results || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    if(dataArray === null){
        return <h2 className="loading">loading...</h2>
    }

    function receiveAnswers(answer) {
        const existingAnswerIndex = userAnswers.findIndex(item => item.questionId === answer.questionId);
        if (existingAnswerIndex !== -1) {
            setUsersAnswers(userAnswers => {
                const tempAnswer = userAnswers;
                tempAnswer[existingAnswerIndex] = answer;
                return tempAnswer;
            });
        } else {
            setUsersAnswers(userAnswers => {
                const tempAnswer = userAnswers;
                tempAnswer.push(answer);
                return tempAnswer;
            });
        }
    }

    function checkAnswer() {
        if (!isComplete) {
            let tempUserAnswers = [];
            let newMarks = 0;
            userAnswers.forEach(item => {
                if (Object.keys(item).length > 1) {
                    tempUserAnswers.push(item);
                }
            });
            tempUserAnswers.forEach(item => {
                if (item.correctAnswer === item.selectedAnswer.answer) {
                    newMarks++;
                }
            });
            setMarks(newMarks);
            setIsComplete(true);
            setCheckButton("Play Again");
        } else {
            window.location.reload();
        }
    }

    const allQuestions = dataArray.map(result => {
        const questionId = generateRandomId(10);
        return <Question
                key={questionId}
                questionId={questionId}
                question={result.question}
                correct={result.correct_answer}
                incorrect={result.incorrect_answers}
                receiveAnswer={receiveAnswers}
                isComplete = {isComplete}
            />;
    });

    function generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let randomId = '';
        for (let i = 0; i < length; i++) {
            randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return randomId;
    }

    return (
        <div className="questions-container">
            {allQuestions}
            <div className="marks-container">
                {isComplete && <div>Marks: {marks}/5</div>}
                <button onClick={checkAnswer} className="check-btn">{checkButton}</button>
                {marks === 5 && <Confetti />}
            </div>
        </div>
    );
}
