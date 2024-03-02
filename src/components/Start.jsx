import React from "react";
import "./Start.css";

export default function Start(props){
    const [difficulty, setDifficulty] = React.useState("any");
    const [category, setCategory] = React.useState("any");

    const handleDifficultyChange = (item) => {
        setDifficulty(item.target.value);
    }

    const handleCategoryChange = (item) => {
        setCategory(item.target.value);
    }

    function sendValues(){
        props.changeIsRunning();
        props.receiveValues(difficulty, category)
    }

    return(
        <div className="start-container">
            <h1 className="start-heading">Quiz App</h1>
            <p className="start-description">This is a quiz app that fetches questions and their answers from an API named 'opentdb API'.</p>
            <div className="filters">
                <div className="filter-difficulty">
                    <label htmlFor="form-difficulty">
                        Difficulty: </label>
                    <select name="difficulty" id="form-difficulty" onChange={handleDifficultyChange}>
                        <option value="any">--Any--</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <br />
                <div className="filter-category">
                    <label htmlFor="form-category">Category: </label>
                    <select name="category" id="form-category" onChange={handleCategoryChange}>
                        <option value="any">
                            --Any Category--
                        </option>
                        <option value="9">
                            General Knowledge
                        </option>
                        <option value="10">
                            Entertainment: Books
                        </option>
                        <option value="11">
                            Entertainment: Film
                        </option>
                        <option value="12">
                            Entertainment: Music
                        </option>
                        <option value="13">
                            Entertainment: Musicals &amp; Theatres
                        </option>
                        <option value="14">
                            Entertainment: Television
                        </option>
                        <option value="15">
                            Entertainment: Video Games
                        </option>
                        <option value="16">
                            Entertainment: Board Games
                        </option>
                        <option value="17">
                            Science &amp; Nature
                        </option>
                        <option value="18">
                            Science: Computers
                        </option>
                        <option value="19">
                            Science: Mathematics
                        </option>
                        <option value="20">
                            Mythology
                        </option>
                        <option value="21">
                            Sports
                        </option>
                        <option value="22">
                            Geography
                        </option>
                        <option value="23">
                            History
                        </option>
                        <option value="24">
                            Politics
                        </option>
                        <option value="25">
                            Art
                        </option>
                        <option value="26">
                            Celebrities
                        </option>
                        <option value="27">
                            Animals
                        </option>
                        <option value="28">
                            Vehicles
                        </option>
                        <option value="29">
                            Entertainment: Comics
                        </option>
                        <option value="30">
                            Science: Gadgets
                        </option>
                        <option value="31">
                            Entertainment: Japanese Anime &amp; Manga
                        </option>
                        <option value="32">
                            Entertainment: Cartoon &amp; Animations
                        </option>		
                    </select>
                </div>
            </div>
            <button onClick={sendValues} className="start-btn">Start Quiz</button>
        </div>
    )
}