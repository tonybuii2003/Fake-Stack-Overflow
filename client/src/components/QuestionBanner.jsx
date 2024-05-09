import React, { useEffect } from 'react';
import { useState } from 'react';
import '../stylesheets/QuestionBanner.css';

function QuestionBanner({questions, tags, showQuestionFormFunc, setOption, showSearchResults, currentSearchTag, questionCount, setQuestionCount, currentPage, totalPages, handlePages, user}) {
    const [allQuestionsText, setAllQuestionsText] = useState("All Questions");
    console.log(user);
    console.log(user.isGuest);
    console.log('cureent page: ',currentPage);
    useEffect(() => {
      if (showSearchResults) {
          if (currentSearchTag !== undefined && currentSearchTag !== 'null') {
              setAllQuestionsText(`Showing questions tagged with [${currentSearchTag}]`);
              const tag = tags.find(tag => tag.name === currentSearchTag);
              if (tag) {
                  setQuestionCount(questions.filter(question => question.tags.some(questionTag => questionTag.name === tag.name)).length);
              }
          } else {
              setAllQuestionsText("Search Results");
              setQuestionCount(questions.length);
          }
      } 
      else {
          setAllQuestionsText("All Questions");
          setQuestionCount(questions.length);
      }
  }, [questions, tags, currentSearchTag, showSearchResults, setQuestionCount, setAllQuestionsText])
    const handleClick = () => {
        showQuestionFormFunc()
    }

    const handleDeny = (reason) => {
        alert("You must be logged in to " + reason + "!\nPlease login or register first.");
    }

    const userGuest = user.isGuest;
    console.log("Userguest", userGuest);
    const questionCountText = questionCount === 1 ? "question" : "questions";
    return (
    <div className="questionBanner">
        <div className="leftSection">
          <h1 id="allQuestionsText">{allQuestionsText}</h1>
          <span className="questionCountText">{questionCount} {questionCountText}</span>
        </div>
        {totalPages === 0 ? null : 
          <div className="middleSection">
            
            <button id="themeButtonPrevOn" 
                    disabled={currentPage === 0}
                    onClick={() => handlePages('prev')}>
                Prev
            </button>
            <div className="themePageIndex">{currentPage + 1} / {totalPages}</div>
            <button id="themeButtonNext" 
                    
                    onClick={() => handlePages('next')}>
                Next
            </button>
          </div>}
        <div className="rightSection">
          {!userGuest ? 
          (<button id="themeButtonAskQuestion" onClick={handleClick}> Ask Question</button>
          ) 
          : 
          (<button id="themeButtonAskQuestionInactive" onClick={() => handleDeny("ask a question")}> Ask Question</button>
          )}
          <div className="questionFilters">
            <button id="newestOption" className="filterButton" onClick={()=>setOption('newest')}>Newest</button>
            <button id="activeOption" className="filterButton" onClick={() => setOption('active')}>Active</button>
            <button id="unansweredOption" className="filterButton" onClick={() => setOption('unanswered')}>Unanswered</button>
          </div>
        </div>
    </div>
    )
}
export default QuestionBanner;