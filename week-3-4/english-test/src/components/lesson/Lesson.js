import "./lesson.css"
export const Lesson =(props)=>{
    const {examName, totalPoint, totalTime} = props
    return (
        <div className="lesson-wrapper">
            <div className="exam-name">{examName}</div>
            <p>Total point: <span>{totalPoint}</span></p>
            <p>Total time: <span>{totalTime}</span></p>
            <button className="center-item">Start</button>
            <div className="tag center-item">{totalPoint}</div>
        </div>
    )
}