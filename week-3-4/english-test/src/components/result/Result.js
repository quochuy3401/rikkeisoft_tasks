import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import {ExamContext} from "../../context/exam"
import "../home/Home";

export const Result = () => {
    const userCtx = useContext(UserContext);
    const examCtx = useContext(ExamContext);
    const navigate = useNavigate();
    console.log(examCtx.exam);
    const handleLogOut = () => {
        localStorage.removeItem("userinfo");
        userCtx.setUser(null);
        navigate("/login");
      };
  return (
    <>
      <div className="home-page">
        <div className="info-navbar">
          <div className="container">
            <div>
              Your id: <span>{userCtx.user.id}</span>
            </div>
            <button className="btn btn-success" type="button" onClick={handleLogOut}>
              Log out &nbsp;
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        </div>
        <div className="container test-wrapper d-flex justify-content-center align-items-center flex-column">
          <h1>Your score: <span style={{color: 'red'}}>{examCtx.exam.scores}/{examCtx.exam.totalPoint}</span></h1>
          <p>This score is quite low. You need to try harder!</p>
        </div>
      </div>
    </>
  );
};
