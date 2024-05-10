import React from 'react';
import '../stylesheets/QuestionsList.css';
import { displayQuestionDate } from '../utils/displayDate';

function ProfileQuestionsList({ questions, setCurrentQID, showQuestionAndAnswersFunc}) {
    const handleClick = (qid) => {
        setCurrentQID(qid);
        showQuestionAndAnswersFunc();
    };

    if (!questions || questions.length === 0) {
        return <h1 className="noQuestionsFound">No Questions Found</h1>;
    }

    return (
        <div className="questionsList">
            {questions.map(question => (
                <div className="question" key={question._id}>
                    <div className="question-title-stack">
                        <h3 className="questionLink" onClick={() => handleClick(question._id)}>{question.title}</h3>
                    </div>
                    <div className="question-meta">
                        <span style={{color: "red"}}>{question.asked_by}</span>
                        <span style={{color: "grey"}}> asked {displayQuestionDate(question.ask_date_time)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProfileQuestionsList;
