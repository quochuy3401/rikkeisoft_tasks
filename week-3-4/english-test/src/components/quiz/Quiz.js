import {
  faArrowUpLong,
  faCircleExclamation,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/user";
import axiosInstance from "../../util/axiosInstance";
import "./quiz.css";
import "../register/register.css";
import "../../App.css";

import { Question } from "../question/Question";
import { Timer } from "../timer/Timer";
import { LoadingIndicator } from "../../share/LoadingIndicator";
import { ExamContext } from "../../context/exam";

export const Quiz = () => {
  const userCtx = useContext(UserContext);
  const examCtx = useContext(ExamContext);
  const navigate = useNavigate();
  const params = useParams();
  const quizId = parseInt(params.id);

  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const [listAnswer, setListAnswer] = useState([]);
  const [listAnswerButton, setListAnswerButton] = useState([]);
  const [visible, setVisible] = useState(false);
  const _userId = userCtx.user.id.toString();
  const token = userCtx.user.token;

  useEffect(() => {
    handleStart();
  }, []);

  //remove userinfo in localStorage and UserContext
  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    userCtx.setUser(null);
    navigate("/login");
  };

  const scrollToQuestion = (id) => {
    const target = document.getElementById(id).getBoundingClientRect().top - 70; //minus height of navbar
    window.scrollTo({ top: target, behavior: "smooth" });
  };


  //get game
  const handleStart = () => {
    setLoading(true);
    axiosInstance
      .post(
        "/games/getGame",
        {
          examId: quizId,
          userId: _userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        examCtx.setExam({
          totalPoint: res.data.totalPoint,
          totalTime: res.data.totalTime,
          quantity: data.length,
        });
        setStart(true);
        console.log(data);
        setListQuestion(data);
        const newArr = [];
        for (let i = 0; i < data.length; i++) {
          newArr.push({ id: data[i].id, isAnswered: false });
        }
        setListAnswerButton(newArr);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
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
          examId: quizId,
          userId: _userId,
          listAnswer: listAnswer,
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
        examCtx.setExam({ ...examCtx.exam, scores: res.data.scores });
        // setLoading(false);
        navigate("/result");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const toggleVisible = () => {
    const scrolled =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else if (scrolled <= 200) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="quiz-page">
      <div className="info-navbar">
        <div className="container">
          <div className="align-items-center justify-content-center d-flex">
            Your id: <span>{userCtx.user.id}</span>
          </div>
          <button className="btn" type="button" onClick={handleLogOut}>
            Log out &nbsp;
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </div>

      <div className="container quiz-wrapper">
        <div className="row">
          <div className="left-side col-md-12 col-lg-3">
            {start && (
              <div className="exam-manager">
                <Timer
                  initialMinutes={examCtx.exam.totalTime}
                  handleTimeOut={handleFinish}
                />
                <div>
                  Completed: {listAnswer.length}/{examCtx.exam.quantity}
                </div>
                <div className="list-button">
                  {listAnswerButton.map((button, index) => {
                    return (
                      <div
                        key={index}
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
                        {index + 1}
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShow(true);
                  }}
                  className="btn-danger btn"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
          <div className="right-side col-md-12  col-lg-9 ">
            {listQuestion.map((question, index) => {
              return (
                <Question
                  key={question.id}
                  index={index}
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
      {loading && <LoadingIndicator size="2x" />}

      {/* modal */}
      {show && (
        <div className="loading">
          <div className="modal-content">
            <div className="modal-body">
              <div>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  size="3x"
                  color="red"
                />
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
      )}

      {/* scroll to top button  */}
      {visible && (
        <div id="scrollToTop" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUpLong} />
        </div>
      )}
    </div>
  );
};
