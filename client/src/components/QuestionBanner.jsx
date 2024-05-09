import React, { useEffect } from 'react';
import '../stylesheets/QuestionBanner.css';

function QuestionBanner({questions, tags, showQuestionFormFunc, setOption, showSearchResults, currentSearchTag, onSubmitSearch, setAllQuestions, savedDisplayedQuestionCount, currentPage, setCurrentPage, currentTotalPages, setCurrentTotalPages, user}) {
    let allQuestionsText;
    let questionCount;
    console.log(user);
    console.log(user.isGuest);
    if(showSearchResults){
      if(currentSearchTag !== undefined && currentSearchTag !== 'null'){
        allQuestionsText = "Showing questions tagged with [" + currentSearchTag + "]";
        const tag = tags.find(tag => tag.name === currentSearchTag);
        questionCount = questions.filter(question => question.tags.some(questionTag => questionTag.name === tag.name)).length;
      }
      else {
        allQuestionsText = "Search Results"
        questionCount = savedDisplayedQuestionCount;
      }
    }
    else {
      allQuestionsText = "All Questions"
      questionCount = questions.length;
    }
    const handleClick = () => {
        showQuestionFormFunc()
    }

    const handleDeny = (reason) => {
        alert("You must be logged in to " + reason + "!\nPlease login or register first.");
    }

    const handlePages = (direction) => {
      let newPage = currentPage;
      if (direction === 'next') {
        newPage = (newPage + 1) % currentTotalPages;
      } 
      else if (direction === 'prev') {
        newPage = (newPage - 1 + currentTotalPages) % currentTotalPages;
      }
      //setCurrentPage(newPage);
    }
    const userGuest = user.isGuest;
    console.log("Userguest", userGuest);
    const questionCountText = questionCount === 1 ? "question" : "questions";
    return (
    <div className="questionBanner">
        <div className="leftSection">
          <div id="allQuestionsText">{allQuestionsText}</div>
          <span className="questionCountText">{questionCount} {questionCountText}</span>
        </div>
        <div className="middleSection">
          {currentPage !== 1 ?
          (<button id="themeButtonPrevOn" onClick={handlePages('prev')} > Prev</button>)
          :
          (<button id="themeButtonPrevOff"> Prev</button>)}
          <div className="themePageIndex">{currentPage} / {currentTotalPages}</div>
          <button id="themeButtonNext" onClick={handlePages('next')}> Next</button>
        </div>
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