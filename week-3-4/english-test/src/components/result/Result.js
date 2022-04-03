import {
  faFaceFrown,
  faRightFromBracket,
  faFaceSmile,
  faHandsClapping,
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
  console.log(examCtx.exam);

  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    userCtx.setUser(null);
    navigate("/login");
  };

  const backToHome =()=>{
    navigate("/home");
  }

  function chooseMassage() {
    if (exam.scores < 50) {
      messageTheme = messages[0];
    } else if (exam.scores < 80) {
      messageTheme = messages[1];
    } else {
      messageTheme = messages[2];
    }
  }

  chooseMassage();
  return (
    <>
      <div className="quiz-page">
        <div className="info-navbar">
          <div className="container">
            <div>
              Your id: <span>{user.id}</span>
            </div>
            <button
              className="btn"
              type="button"
              onClick={handleLogOut}
            >
              Log out &nbsp;
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        </div>
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
          <button className="btn btn-primary" onClick={backToHome}>Back to Home</button>
        </div>
      </div>
    </>
  );
};
