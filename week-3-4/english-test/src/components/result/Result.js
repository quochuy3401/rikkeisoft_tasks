import {
  faFaceFrown,
  faFaceSmile,
  faHandsClapping,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { ExamContext } from "../../context/exam";
import "../quiz/quiz.css";

export const Result = () => {
  const userCtx = useContext(UserContext);
  const examCtx = useContext(ExamContext);
  const { exam } = examCtx;
  const { user } = userCtx;
  const navigate = useNavigate();
  const messages = [
    {
      icon: faFaceFrown,
      color: "red",
      message: "This score is quite low. You need to try harder!",
    },
    {
      icon: faFaceSmile,
      color: "yellow",
      message: "This score is not too bad!",
    },
    {
      icon: faHandsClapping,
      color: "green",
      message: "This score is great. Congratulations!",
    },
  ];
  let messageTheme = {};

  const handleBackHome = () => {
    navigate("/home");
  };

  function chooseMassage() {
    if (exam.scores / exam.totalPoint < 0.5) {
      messageTheme = messages[0];
    } else if (exam.scores / exam.totalPoint < 0.8) {
      messageTheme = messages[1];
    } else {
      messageTheme = messages[2];
    }
  }

  chooseMassage();
  return (
    <>
      <div className="quiz-page">
        {/* navbar */}
        <div className="info-navbar">
          <div className="container">
            <div>{user.lastName + " " + user.firstName}</div>
            <button className="btn" type="button" onClick={handleBackHome}>
              Back &nbsp;
              <FontAwesomeIcon icon={faHouseUser} />
            </button>
          </div>
        </div>
        {/* content */}
        <div className="container quiz-wrapper d-flex justify-content-center align-items-center flex-column">
          <FontAwesomeIcon
            icon={messageTheme.icon}
            size="5x"
            color={messageTheme.color}
          />
          <h1>
            Your score:{" "}
            <span style={{ color: `${messageTheme.color}` }}>
              {exam.scores}/{exam.totalPoint}
            </span>
          </h1>
          <p>{messageTheme.message}</p>
        </div>
      </div>
    </>
  );
};
