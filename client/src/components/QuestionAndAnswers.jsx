import React, { useState, useEffect, useCallback } from 'react';
import '../stylesheets/QuestionAndAnswers.css';
import { displayQuestionDate } from '../utils/displayDate';
import CommentForm from './CommentForm';
import axios from 'axios';

function QuestionAndAnswers({qid, showQuestionFormFunc, showAnswerFormFunc, user}) {
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]); 
    const [comments, setComments] = useState({});
    const [commentPageInfo, setCommentPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const answersPerPage = 5;

    const handleDeny = (reason) => {
        alert("You must be logged in to " + reason + "!\nPlease login or register first.");
    }
    console.log('current ID:', qid);
    const fetchData = useCallback(async () => {
        if (qid) {
            try {
                await axios.put(`http://localhost:8000/question/${qid}/view`);
                const questionResponse = await axios.get(`http://localhost:8000/question/${qid}`);
                setQuestion(questionResponse.data);
                const answersResponse = await axios.get(`http://localhost:8000/answer/${qid}`);
                console.log("fetchy:", answersResponse.data);
                setAnswers(answersResponse.data);
                //setCurrentPage(currentPage);
                const newComments = {};
                const newCommentPageInfo = {};
                for (const answer of answersResponse.data) {
                    const commentsResponse = await axios.get(`http://localhost:8000/answer/${answer._id}/comment`);
                    newComments[answer._id] = commentsResponse.data;
                    newCommentPageInfo[answer._id] = { currentPage: 0, showNavigation: true, showCommentForm: false };
                }
                setComments(newComments);
                setCommentPageInfo(newCommentPageInfo);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, [qid]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    useEffect(() => {
        setTotalPages(Math.ceil(answers.length / answersPerPage));
        setCurrentPage(currentPage);
    }, [answers, answersPerPage]);
    
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
      const updateVotes = (commentId, newVotes) => {
        setComments(prevComments => {
            return Object.keys(prevComments).reduce((acc, key) => {
                acc[key] = prevComments[key].map(comment => {
                    if (comment._id === commentId) {
                        return { ...comment, votes: newVotes };
                    }
                    return comment;
                });
                return acc;
            }, {});
        });
    };
    const handleUpvote = async (commentId) => {
        try {
            const response = await axios.post(`http://localhost:8000/comment/${commentId}/upvote`);
            updateVotes(commentId, response.data.votes); 
        } catch (error) {
            console.error('Error upvoting the comment:', error);
        }
    };
    const toggleCommentForm = (answerId) => {
        console.log('show comment:', commentPageInfo[answerId].showCommentForm);
        setCommentPageInfo(prev => ({
            ...prev,
            [answerId]: {
                ...prev[answerId],
                showCommentForm: !prev[answerId].showCommentForm,
                showNavigation: !prev[answerId].showNavigation
            }
        }));
    };
    const handlePages = (direction) => {
        if (direction === 'next') {
            setCurrentPage((currentPage + 1) % totalPages);
        } else if (direction === 'prev') {
            setCurrentPage((currentPage - 1 + totalPages) % totalPages);
        }
        else {
            setCurrentPage(currentPage);
        }
      };
    const handlePagination = (answerId, direction) => {
        setCommentPageInfo(prev => {
            const totalPages = Math.ceil((comments[answerId] || []).length / 3);
            let newPage = prev[answerId].currentPage;
    
            if (direction === 'next') {
                newPage = (newPage + 1) % totalPages;
            } else if (direction === 'prev') {
                newPage = (newPage - 1 + totalPages) % totalPages;
            }
    
            return {
                ...prev,
                [answerId]: {
                    ...prev[answerId],
                    currentPage: newPage
                }
            };
        });
    };
      const renderComments = (answerId) => {
        const answerComments = comments[answerId] || [];
        const pageInfo = commentPageInfo[answerId] || { currentPage: 0, showNavigation: true, showCommentForm: false };
        const guestMode = user.isGuest == true;
        console.log('page info:', pageInfo)

        if (answerComments.length === 0) {
            return <div>
                <p className="comment-none">This answer has no comments yet.</p>
                {guestMode == false ? (
                <h5 className="comment-button" onClick={() => toggleCommentForm(answerId)}>Add Comment</h5>
                ) : (
                <h5 className="comment-button-inactive">You must be logged in to add a comment!</h5>)}
               
                {pageInfo.showCommentForm && <CommentForm answerId={answerId} setCommentPageInfo={setCommentPageInfo} user={user} fetchData={fetchData}/>}
                </div>;
        }
        const commentsPerPage = 3;
        const currentComments = answerComments.slice(
            pageInfo.currentPage * commentsPerPage,
            (pageInfo.currentPage + 1) * commentsPerPage
        );
        console.log('current page:', pageInfo.currentPage);
        return (
            <div className="comment">
                <div className="comment-container">
                {currentComments.map((comment, index) => (
                    
                    <div key={index} className="comment-content">
                        <button className="upvote-button" onClick={() => handleUpvote(comment._id)}>Upvote</button>
                        <span className="comment-votes">{comment.votes}</span>
                        <p>{comment.text}</p>
                        <div className="comment-details">
                            <span style={{color: "green"}}>{comment.commented_by}</span> 
                            <span>{displayQuestionDate(comment.comment_date_time)}</span>
                        </div>
                        
                    </div>
                ))}
                

                </div>
            
                {guestMode == false ? (
                <h5 className="comment-button" onClick={() => toggleCommentForm(answerId)}>Add Comment</h5>
                ) : (
                <h5 className="comment-button-inactive">You must be logged in to add a comment!</h5>)}
               
                {commentPageInfo[answerId].showCommentForm && <CommentForm answerId={answerId} setCommentPageInfo={setCommentPageInfo} user={user} fetchData={fetchData}/>}
                {pageInfo.showNavigation && (
                    <div className="navigation-button">
                        <button 
                            disabled={pageInfo.currentPage === 0}
                            onClick={() => handlePagination(answerId, 'prev')}
                        >
                            Prev
                        </button>
                        <button 
                            onClick={() => handlePagination(answerId, 'next')}
                        >
                            Next
                        </button>
                    </div>
                )}
                
                
            </div>
        );
    };
    
      if (!question) return <div id="loading">Loading...</div>;
      const viewCountText = question.views === 1 ? "view" : "views";
      const answerCountText = answers.length === 1 ? "answer" : "answers";
      const answerRender = answers.slice(currentPage * answersPerPage, (currentPage + 1) * answersPerPage)
      const userGuest = user.isGuest;
      return (
        <div className="questionAndAnswers">
            <div className="showQuestionsandAnswer"></div>
                
                <div className="selected-question">
                    <div className="s1">
                        <div className="question-stats">{question.answers.length} {answerCountText}</div>
                        <h3>{question.title}</h3>
                        {!userGuest ? 
          (<button id="themeButtonAskQuestion" onClick={handleClickQuestion}> Ask Question</button>
          ) 
          : 
          (<button id="themeButtonAskQuestionInactive" onClick={() => handleDeny("ask a question")}> Ask Question</button>
          )}
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
                        {answerRender.map((answer, index) => (
                            <div key={answer._id || index} className="answer"> 
                            <div className="answer-row">
                                <div className="answer-text">
                                    {renderTextWithLinks(answer.text)}
                                </div>
                                <div className="answer-meta">
                                    <span style={{color: "green"}} className="name">{answer.ans_by}</span>
                                    <span style={{color: "grey"}} className="date">answered {displayQuestionDate(answer.ans_date_time)}</span>
                                </div>
                            </div>
                                {renderComments(answer._id)}
                            </div>
                            
                           
                        ))}
                    </div>
                ) : (
                    <div className="noAnswers">No Answers Yet</div>
                )}
            <div className="answer-question">
                {!userGuest ? 
          (<button id="themeButtonAnswerQuestion" onClick={handleClickAnswer}>Answer Question</button>
          ) 
          : 
          (<button id="themeButtonAnswerQuestionInactive" onClick={() => handleDeny("answer a question")}> Answer Question</button>
          )}
          <div className="navigation-button">
                        <button 
                            disabled={currentPage === 0}
                            onClick={() => handlePages('prev')}
                        >
                            Prev
                        </button>
                        <button 
                            onClick={() => handlePages('next')}
                        >
                            Next
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default QuestionAndAnswers;
