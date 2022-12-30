import React from 'react'
import questions from '../questions.js'
import "./components.css"

export default function Result(props) {
  return (
    <div>
      <div id='score'><h1>Your score is {props.score} out of {questions.length} -({(props.score/questions.length)*100}%)</h1></div>
    </div>
  )
}
