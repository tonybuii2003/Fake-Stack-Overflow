import React from 'react';
import '../stylesheets/QuestionsList.css';
import { displayQuestionDate } from '../utils/displayDate';
import axios from 'axios';
function QuestionsList({ filteredQuestions, setFilteredQuestions, showQuestionAndAnswersFunc, setCurrentQID, userToken, tryLogin, setTryLogin}) {
    const handleClick = (qid) => {
        setCurrentQID(qid);
        showQuestionAndAnswersFunc();
    };
    if (!filteredQuestions || filteredQuestions.length === 0) {
        return <h1 className="noQuestionsFound">No Questions Found</h1>;
    }
    const handleVote = async (questionId, type) => {
        try {
            const userData = await axios.get(`http://localhost:8000/user/${userToken.userId}`);
            console.log('User data rep:', userData.data.reputation);
            if (userData.data.reputation < 50) {
                console.log('Your reputation must be 50 or higher to vote.');
                alert('Your reputation must be 50 or higher to vote.');
                return;
            }
            const updatedQuestions = filteredQuestions.map(question => {
                if (question._id === questionId) {
                    const voteIncrement = type === 'upvote' ? 1 : -1;
                    return { ...question, votes: question.votes + voteIncrement };
                }
                return question;
            });
            setFilteredQuestions(updatedQuestions);

            const response = await axios.put(`http://localhost:8000/question/${questionId}/${type}`)
            console.log('Vote response:', response.data);
            setTryLogin(!tryLogin)
        } catch (error) {
            console.error('Error voting:', error.response ? error.response.data : error.message);
        }
    };
    return (
        <div className="questionsList">
            {filteredQuestions.map(question => (
                <div className="question" key={question._id}>
                    <div className="voting">
                        <span className="comment-votes">{question.votes}</span>
                    </div>
                    <div className="question-stats-stack">
                        <button className="upvote-button" onClick={() => handleVote(question._id, 'upvote')}>Upvote</button>
                        <div className="question-stats">{question.answers.length} {question.answers.length === 1 ? "answer" : "answers"}</div>
                        <div className="question-stats">{question.views} {question.views === 1 ? "view" : "views"}</div>
                        <button className="downvote-button" onClick={() => handleVote(question._id, 'downvote')}>Downvote</button>
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
