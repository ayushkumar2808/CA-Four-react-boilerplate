import React, { useState } from "react";
import questions from "../questions.js";
import "./components.css";
import moon from './images/moon.png'
import sun from './images/sun.png'

import Result from "./Result.js";
const wrongQuestions = [];

export default function QuestionBox() {
  const [number, setNumber] = useState(0);
  
  const [mode, setMode] = useState("light");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [modeText, setModeText] = useState(moon);
  const [highlight,setHighlight] = useState("Red")
  const [highlightText,setHighlightText] = useState("Remove Highlight")
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setModeText(sun);
      document.body.style.backgroundColor = "#a6a6a6";
      document.body.style.color = "white";
    } else {
      setMode("light");
      setModeText(moon);
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  const nextQue = (i) => {
    if (number < 4) {
      setNumber(number + 1);
    } else if (number === 4) {
      setShowScore(true);
    }
    if (questions[number].options[i].isCorrect === true) {
      setScore(score + 1);
    } else {
      wrongQuestions.push({
        wrong: questions[number].text,
      });
    }
  };
  const changeHighlight =()=>{
    if(highlight==="red"){
      setHighlight("blue")
      setHighlightText("Show Highlight")
    }
    else{
      setHighlight("red")
      setHighlightText("Remove Highlight")
    }
  }

  const restartGame =()=>{
    window.location.reload()
  }

  return (
    <div id="display">
      <div id="kal-button">
        <div>
          <h1>Kalvium</h1>
        </div>
       
        <div id="mode-change-div">
          {/* <button onClick={toggleMode}>{modeText}</button> */}
          <img onClick={toggleMode} src={modeText} alt="" />
        </div>
      </div>

      <div
        id="question-div"
        style={{ backgroundColor: mode === "light" ? " #b3b3b3" : "black" }}
      >
        {showScore ? (
          <>
            <Result score={score} />{" "}
            <div>
              
              <h2>Your wrong attempts</h2>
              {wrongQuestions.map((data) => (
                <>
                   <h>{data.wrong}</h>
                   <hr />
                </>
              ))}
              <button onClick={restartGame} id="restart-button" >Restart Game</button>
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <h3>
              Question {number + 1} out of {questions.length}
            </h3>
            <h1 id="Question" style={{color: highlight}} >
              {questions[number].text}
            </h1>
            <div id="answer-button">
              {questions[number].options.map((item, i) => (
                <button
                  className="ans-button"
                  style={{ color: mode === "light" ? " black" : "white" }}
                  onClick={() => nextQue(i)}
                >
                  {item.text}
                </button>
              ))}
            </div>
            <div id="highlight-button">
              <button className="highlight" onClick={changeHighlight}>
                {highlightText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
