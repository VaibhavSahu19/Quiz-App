import React from "react";
import Start from "./components/Start"
import Quiz from "./components/Quiz";

//https://opentdb.com/api.php?amount=5&type=multiple
export default function App(){
    const [difficulty, setDifficulty] = React.useState("any");
    const [category, setCategory] = React.useState("any");

    function changeIsRunning(){
        setIsRunning(!isRunning);
    }

    function receiveValues(difficulty, category){
        setDifficulty(difficulty);
        setCategory(category);
    }

    const [isRunning, setIsRunning] = React.useState(false);

    return(
        <div>
            {!isRunning ? <Start
                changeIsRunning = {changeIsRunning}
                receiveValues = {receiveValues}
            /> : <Quiz
                difficulty = {difficulty}
                category = {category}
                changeIsRunning = {changeIsRunning}
            />}
        </div>
    );
}