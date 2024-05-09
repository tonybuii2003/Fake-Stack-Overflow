import React from 'react';
import '../stylesheets/QuestionsList.css';
import { displayQuestionDate } from '../utils/displayDate';

function QuestionsList({ filteredQuestions, showQuestionAndAnswersFunc, setCurrentQID, option, currentSearchQuery, setSavedDisplayedQuestionCount, currentPage, setCurrentPage, currentTotalPages, setCurrentTotalPages}) {
    const handleClick = (qid) => {
        setCurrentQID(qid);
        showQuestionAndAnswersFunc();
    };

    if (!filteredQuestions || filteredQuestions.length === 0) {
        return <h1 className="noQuestionsFound">No Questions Found</h1>;
    }

    return (
        <div className="questionsList">
            {filteredQuestions.map(question => (
                <div className="question" key={question._id}>
                    <div className="question-stats-stack">
                        <div className="question-stats">{question.answers.length} {question.answers.length === 1 ? "answer" : "answers"}</div>
                        <div className="question-stats">{question.views} {question.views === 1 ? "view" : "views"}</div>
                    </div>
                    <div className="question-title-stack">
                        <h3 className="questionLink" onClick={() => handleClick(question._id)}>{question.title}</h3>
                        <p className="question-summary">{question.summary}</p>
                        <div className="question-tags">{question.tags.map(tag => <span className="tag" key={tag._id}>{tag.name}</span>)}</div>
                    </div>
                    <div className="question-meta">
                        <span style={{color: "red"}}>{question.asked_by}</span>
                        <span style={{color: "greynp"}}> asked {displayQuestionDate(question.ask_date_time)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default QuestionsList;
