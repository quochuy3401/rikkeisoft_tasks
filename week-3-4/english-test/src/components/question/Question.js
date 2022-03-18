import React from "react";
import "./question.css";

export const Question = (props) => {
  const { id, questionTitle, questionContent } = props.question;
  const listAnswer = props.handleChange[0];
  const setListAnswer = props.handleChange[1];
  const handleOnChange = (e) => {
    setListAnswer([...listAnswer,{ id: parseInt(e.target.name), questionAnswer: e.target.value }]);
  };

  // split questionContent into 4 answers
  const splittedContent = questionContent.split("|");

  return (
    <div className="question-wrapper">
      <p className="question-title">
        {id}. {questionTitle}
      </p>
      <div className="row">
        <div className="answer col-6">
          <input
            type="radio"
            name={id}
            value={splittedContent[0]}
            onChange={handleOnChange}
          />
          <label>A. {splittedContent[0]}</label>
        </div>
        <div className="answer col-6">
          <input
            type="radio"
            name={id}
            value={splittedContent[1]}
            onChange={handleOnChange}
          />
          <label>B. {splittedContent[1]}</label>
        </div>
        <div className="answer col-6">
          <input
            type="radio"
            name={id}
            value={splittedContent[2]}
            onChange={handleOnChange}
          />
          <label>C. {splittedContent[2]}</label>
        </div>
        <div className="answer col-6">
          <input
            type="radio"
            name={id}
            value={splittedContent[3]}
            onChange={handleOnChange}
          />
          <label>D. {splittedContent[3]}</label>
        </div>
      </div>
    </div>
  );
};
