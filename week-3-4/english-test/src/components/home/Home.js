import {
  faCircleExclamation,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import axiosInstance from "../../util/axiosInstance";
import "./home.css";
import "../register/register.css";
import "../../App.css";

import { Question } from "../question/Question";
import { Timer } from "../timer/Timer";
import { LoadingIndicator } from "../../share/LoadingIndicator";
import { ExamContext } from "../../context/exam";

export const Home = () => {
  const userCtx = useContext(UserContext);
  const examCtx = useContext(ExamContext);
  const navigate = useNavigate();
  // const [examParams, setExamParams] = useState({
  //   totalPoint: 0,
  //   totalTime: 0,
  //   quantity: 0,
  // });
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const [listAnswer, setListAnswer] = useState([]);
  const [listAnswerButton, setListAnswerButton] = useState([]);
  const _userId = userCtx.user.id.toString();
  const token = userCtx.user.token;

  //remove userinfo in localStorage and UserContext
  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    userCtx.setUser(null);
    navigate("/login");
  };

  const scrollToQuestion = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  //get game
  const handleStart = () => {
    setLoading(true);
    axiosInstance
      .post(
        "/games/getGame",
        {
          examId: 24,
          userId: _userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const data = res.data.data;
        // setExamParams({
        //   totalPoint: res.data.totalPoint,
        //   totalTime: 1,
        //   quantity: data.length,
        // });
        examCtx.setExam({
          totalPoint: res.data.totalPoint,
          totalTime: 1,
          quantity: data.length,
        });
        setStart(true);
        setListQuestion(data);
        const newArr = [];
        for (let i = 0; i < data.length; i++) {
          newArr.push({ id: data[i].id, isAnswered: false });
        }
        setListAnswerButton(newArr);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleFinish = () => {
    console.log(listAnswer);
    setShow(false);
    setLoading(true);
    console.log(listAnswerButton);
    axiosInstance
      .post(
        "/games/finishGame",
        {
          examId: 24,
          userId: _userId,
          listAnswer: listAnswer,
          // totalTime: examParams.totalTime,
          totalTime: examCtx.exam.totalTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        examCtx.setExam({...examCtx.exam, scores: res.data.scores});
        // setLoading(false);
        navigate("/result");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="home-page">
      <div className="info-navbar">
        <div className="container">
          <div>
            Your id: <span>{userCtx.user.id}</span>
          </div>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleLogOut}
          >
            Log out &nbsp;
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </div>

      <div className="container test-wrapper">
        <div className="row">
          <div className="left-side col-3">
            {!start ? (
              <>
                <button
                  className="btn-success"
                  type="button"
                  onClick={handleStart}
                >
                  Start
                </button>
              </>
            ) : (
              <>
                <Timer
                  initialMinutes={examCtx.exam.totalTime}
                  handleTimeOut={handleFinish}
                />
                <div>
                  Completed: {listAnswer.length}/{examCtx.exam.quantity}
                </div>
                <div className="list-button">
                  {listAnswerButton.map((button) => {
                    return (
                      <div
                        key={button.id}
                        className="answer-button"
                        style={
                          button.isAnswered
                            ? { background: "#333", color: "#fff" }
                            : null
                        }
                        onClick={() => {
                          scrollToQuestion(button.id);
                        }}
                      >
                        {button.id}
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShow(true);
                  }}
                  className="btn-danger"
                >
                  Submit
                </button>
              </>
            )}
          </div>
          <div className="right-side col-9">
            {listQuestion.map((question) => {
              return (
                <Question
                  key={question.id}
                  question={question}
                  handleChange={[
                    listAnswer,
                    setListAnswer,
                    listAnswerButton,
                    setListAnswerButton,
                  ]}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* spin loading */}
      {loading ? <LoadingIndicator size="2x" /> : null}

      {/* modal */}
      {show ? (
        <div className="loading">
          <div className="modal-content">
            <div className="modal-body">
              <div>
                <FontAwesomeIcon icon={faCircleExclamation} size="3x" />
              </div>
              <h2>Are you sure finish?</h2>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleFinish}>
                Yes!
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShow(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
