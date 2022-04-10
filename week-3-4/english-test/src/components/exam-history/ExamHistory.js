import "./exam-history.css";

export const ExamHistory = (props) => {
  const { examName, numberOfCorrect, totalRecords, totalTime, totalPoint } =
    props.history;

  // totalTime's measure is second
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  return (
    <div className="history-wrapper shadow-fb">
      <div className="exam-name">{examName}</div>
      <div className="result-wrapper">
        <p className="">
          <span>Correct: </span>
          {numberOfCorrect}/{totalRecords}
        </p>
        <p className="">
          <span>Time: </span>
          {minutes} min {seconds < 10 ? `0${seconds}` : seconds} sec
        </p>
        <p className="">
          <span>Scores: </span>
          {totalPoint}
        </p>
      </div>
    </div>
  );
};
