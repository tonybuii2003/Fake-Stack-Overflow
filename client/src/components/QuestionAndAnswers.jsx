import React, { useState, useEffect } from 'react';
import '../stylesheets/QuestionAndAnswers.css';
import { displayQuestionDate } from '../utils/displayDate';
import axios from 'axios';

function QuestionAndAnswers({qid, showQuestionFormFunc, showAnswerFormFunc}) {
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]); 
    console.log('current ID:', qid);
    useEffect(() => {
        const fetchData = async () => {
            if (qid) {
                try {
                    // Increment the view count
                    await axios.put(`http://localhost:8000/question/${qid}/view`);
                    // Fetch the updated question data
                    const questionResponse = await axios.get(`http://localhost:8000/question/${qid}`);
                    setQuestion(questionResponse.data);
                    // Fetch the answers, if necessary
                    const answersResponse = await axios.get(`http://localhost:8000/question/${qid}/answer`);
                    setAnswers(answersResponse.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
    
        fetchData();
    }, [qid]);
    console.log('Question and answers fetched:', question);
    const handleClickQuestion = () => {
        showQuestionFormFunc()
    }
    const handleClickAnswer = () => {
        showAnswerFormFunc()
    }
    function createMarkupWithLinks(text) {
        const hyperlinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        return text.replace(hyperlinkRegex, (match, text, url) => {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        });
      }
      function renderTextWithLinks(text) {
        if (text) { 
            return <div dangerouslySetInnerHTML={{ __html: createMarkupWithLinks(text) }} />;
        }
        return null;
      }
      if (!question) return <div id="loading">Loading...</div>;
      const viewCountText = question.views === 1 ? "view" : "views";
      const answerCountText = answers.length === 1 ? "answer" : "answers";
      return (
        <div className="questionAndAnswers">
            <div className="showQuestionsandAnswer"></div>
                
                <div className="selected-question">
                    <div className="s1">
                        <div className="question-stats">{question.answers.length} {answerCountText}</div>
                        <h3>{question.title}</h3>
                        <button id="themeButtonAskQuestionAnswer" onClick={handleClickQuestion}>Ask Question</button>
                    </div>
                    <div className="s2">
                        <div className="question-stats">
                            {question.views} {viewCountText}
                        </div>
                        <div className="question-text">
                            {renderTextWithLinks(question.text)}
                        </div>
                        <div className="s21">
                            <span>
                                <span style={{color: "red"}}>{question.asked_by}</span>
                            </span>
                            <span style={{color: "grey"}}>asked {displayQuestionDate(question.ask_date_time)}</span>
                        </div>
                    </div>
                </div>

                {answers.length > 0 ? (
                    <div className="answers-list">
                        {answers.map((answer, index) => (
                            <div key={answer._id || index} className="answer"> 
                                <div className="answer-text">
                                    {renderTextWithLinks(answer.text)}
                                </div>
                                <div className="answer-meta">
                                    <span style={{color: "green"}} className="name">{answer.ans_by}</span>
                                    <span style={{color: "grey"}} className="date">answered {displayQuestionDate(answer.ans_date_time)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="noAnswers">No Answers Yet</div>
                )}
            <div className="answer-question">
                    <button id="themeButtonAnswerQuestion" onClick={handleClickAnswer}>Answer Question</button>
            </div>
        </div>
    );
}

export default QuestionAndAnswers;
