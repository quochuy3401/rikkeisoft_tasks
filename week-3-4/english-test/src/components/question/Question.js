import React from "react";
import "./question.css";

export const Question = (props) => {
  const { id, questionTitle, answers } = props.ques;
  const handleOnChange = (e) =>{
    console.log(e.target.name + e.target.value);
  }

  return (
    <div className="question-wrapper">
      <p className="question-title">
        {id}. {questionTitle}
      </p>
      <div className="row">
        <div className="answer col-6">
          <input type="radio" name={id} value={answers[0]} onChange={handleOnChange}/>
          <label>A. {answers[0]}</label>
        </div>
        <div className="answer col-6">
          <input type="radio" name={id} value={answers[1]} onChange={handleOnChange}/>
          <label>B. {answers[1]}</label>
        </div>
        <div className="answer col-6">
          <input type="radio" name={id} value={answers[2]} onChange={handleOnChange}/>
          <label>C. {answers[2]}</label>
        </div>
        <div className="answer col-6">
          <input type="radio" name={id} value={answers[3]} onChange={handleOnChange}/>
          <label>D. {answers[3]}</label>
        </div>
        
      </div>
    </div>
  );
};
