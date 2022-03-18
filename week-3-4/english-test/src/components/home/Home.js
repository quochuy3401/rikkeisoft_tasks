import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import axiosInstance from "../../util/axiosInstance";
import "./home.css";
import { Question } from "../question/Question";

export const Home = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  //remove userinfo in localStorage and UserContext
  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    userCtx.setUser(null);
    navigate("/login");
  };

  const questionList = [
    {
      id: 12,
      questionTitle:
        "Giai đoạn thứ hai của cuộc cách mạng khoa học – kĩ thuật hiện đại có điểm gì khác biệt so với giai đoạn thứ nhất?",
      answers: [
        "Khoa học đi trước mở đường cho kĩ thuật phát triển.",
        "Mọi phát minh kĩ thuật đều bắt nguồn từ nghiên cứu khoa học.",
        "Khoa học trở thành lực lượng sản xuất trực tiếp.",
        "Công nghệ trở thành cốt lõi của cách mạng.",
      ],
    },
    {
      id: 13,
      questionTitle:
        "Quốc gia khởi đầu cuộc cách mạng khoa học – kĩ thuật hiện đại là",
      answers: ["Anh.", "Pháp.", "Mỹ.", "Liên Xô."],
    },
  ];

  const answerList = [];

  //get game
  const handleGetGame = () => {
    const _userId = userCtx.user.id.toString();
    const token = userCtx.user.token 
    console.log(_userId);
    console.log(token);
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
        console.log(res);
      });
  };
  return (
    <div className="home-page">
      <div className="navbar">
        <div className="container">
          <div>
            Your id: <span>{userCtx.user.id}</span>
          </div>
          <button type="button" onClick={handleLogOut}>
            Log out &nbsp;
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </div>

      <div className="container test-wrapper">
        <div className="row">
          <div className="left-side col-3">
            <button type="button" onClick={handleGetGame}>
              Start
            </button>
          </div>
          <div className="right-side col-9">
            {questionList.map((question, index) => {
              return <Question key={index} ques={question} />;
            })}
            {/* <Question ques={fakeQuestion} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
