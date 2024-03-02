import React, { useEffect, useState } from "react";
import he from "he";

export default function Question(props) {
    const question = he.decode(props.question);
    const correctAnswer = he.decode(props.correct);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        props.receiveAnswer(selectedAnswer);
    }, [selectedAnswer, props.receiveAnswer]);

    useEffect(() => {
        const allOptions = [
            correctAnswer,
            ...props.incorrect.map(option => he.decode(option))
        ];

        const optionsArray = allOptions.map(option => ({
            id: generateRandomId(10),
            isSelected: false,
            answer: option
        }));

        setAnswers(shuffleArray(optionsArray));
    }, [correctAnswer, props.incorrect]);

    function selectOption(selectedOption) {
        setAnswers(oldAnswers =>
            oldAnswers.map(answer => ({
                ...answer,
                isSelected: answer.id === selectedOption.id ? !answer.isSelected : false
            }))
        );

        setSelectedAnswer({
            questionId: props.questionId,
            correctAnswer: correctAnswer,
            selectedAnswer: selectedOption
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if (i !== j) {
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        return array;
    }

    function generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let randomId = '';
        for (let i = 0; i < length; i++) {
            randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return randomId;
    }

    const options = answers.map(option => (
        <button
            onClick={() => selectOption(option)}
            key={option.id}
            className={`option ${option.isSelected ? 'selected' : ''}`}
        >
            {option.answer}
        </button>
    ));   

    return (
        <div className="question-container">
            <h2 className="question">{question}</h2>
            <div className="all-options">
                {options}
            </div>
            {props.isComplete && <div>{selectedAnswer.selectedAnswer}</div>}
            {props.isComplete && <div className="correct-answer"> Correct Answer: {correctAnswer}</div>}
            <div className="break"></div>
        </div>
    );
}
