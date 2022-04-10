import { useNavigate } from "react-router-dom";
import "./lesson.css";
export const Lesson = (props) => {
  const { examName, totalPoint, totalTime, id } = props;
  const navigate = useNavigate();

  const handleChooseLesson = (id) => {
      navigate(`/quiz/${id}`)
  };

  return (
    <div className="col-6">
      <div className="lesson-wrapper shadow-fb">
        <div className="exam-name">{examName}</div>
        <p>
          Total point: <span>{totalPoint}</span>
        </p>
        <p>
          Total time: <span>{totalTime}</span>
        </p>
        <button
          className="center-item btn-primary"
          onClick={() => {
            handleChooseLesson(id);
          }}
        >
          Start
        </button>
        <div className="tag center-item">{totalPoint}</div>
      </div>
    </div>
  );
};
