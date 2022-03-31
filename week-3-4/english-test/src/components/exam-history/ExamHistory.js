import "./exam-history.css"

export const ExamHistory = (props) => {
  const { examName, numberOfCorrect, totalRecords, totalTime, totalPoint } = props.history;
  return (
    <div className="history-wrapper">
      <div className="exam-name">{examName}</div>
      <div className="result-wrapper">
          <p className=""><span>Correct: </span>{numberOfCorrect}/{totalRecords}</p>
          <p className=""><span>Time: </span>{totalTime} min</p>
          <p className=""><span>Scores: </span>{totalPoint}</p>
      </div>
    </div>
  );
};
