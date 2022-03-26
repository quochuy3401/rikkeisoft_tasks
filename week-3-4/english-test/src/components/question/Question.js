import React from "react";
import "./question.css";

export const Question = (props) => {
  const { id, questionTitle, questionContent } = props.question;
  const listAnswer = props.handleChange[0];
  const setListAnswer = props.handleChange[1];
  const listAnswerButton = props.handleChange[2];
  const setListAnswerButton = props.handleChange[3];

  // split questionContent into 4 answers
  const splittedContent = questionContent.split("|");

  const isExistedId = (arr, id) => {
    return arr.findIndex((arr) => {
      return arr.id == id;
    });
  };

  const handleOnChange = (e) => {
    // check whether this question was answered before
    const answerId = isExistedId(listAnswer, parseInt(e.target.name));
    // this question is not answered
    if (answerId < 0) {
      setListAnswer([
        ...listAnswer,
        { id: parseInt(e.target.name), questionAnswer: e.target.value },
      ]);

      // update listAnswerButton
      const newListAnswerButton = [...listAnswerButton];
      newListAnswerButton[e.target.name - 1] = {
        id: e.target.name,
        isAnswered: true,
      };
      setListAnswerButton(newListAnswerButton);
    }
    // change answer of this question
    else {
      const newListAnswer = [...listAnswer];
      newListAnswer[answerId] = {
        id: parseInt(e.target.name),
        questionAnswer: e.target.value,
      };
      setListAnswer(newListAnswer);
    }
  };

  return (
    <div className="question-wrapper" id={id}>
      <p className="question-title">
        {id}. {questionTitle}
      </p>
      <div className="row">
        <div className="answer col-sm-12 col-md-6">
          <label>
            <input
              type="radio"
              name={id}
              value={splittedContent[0]}
              onChange={handleOnChange}
            />
            <div>A. {splittedContent[0]}</div>
          </label>
        </div>
        <div className="answer col-sm-12 col-md-6">
          <label>
            <input
              type="radio"
              name={id}
              value={splittedContent[1]}
              onChange={handleOnChange}
            />
            <div>B. {splittedContent[1]}</div>
          </label>
        </div>
        <div className="answer col-sm-12 col-md-6">
          <label>
            <input
              type="radio"
              name={id}
              value={splittedContent[2]}
              onChange={handleOnChange}
            />
            <div>C. {splittedContent[2]}</div>
          </label>
        </div>
        <div className="answer col-sm-12 col-md-6">
          <label>
            <input
              type="radio"
              name={id}
              value={splittedContent[3]}
              onChange={handleOnChange}
            />
            <div>D. {splittedContent[3]}</div>
          </label>
        </div>
      </div>
    </div>
  );
};
