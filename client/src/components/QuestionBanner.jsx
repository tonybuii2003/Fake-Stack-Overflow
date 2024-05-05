import React from 'react';
import '../stylesheets/QuestionBanner.css';

function QuestionBanner({questions, tags, showQuestionFormFunc, setOption, showSearchResults, currentSearchTag, onSubmitSearch, setAllQuestions, savedDisplayedQuestionCount, startIndex, setStartIndex}) {
    let allQuestionsText;
    let questionCount;
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

    const currentPage = Math.floor(startIndex / 5) + 1;
    const lastPage = Math.ceil(questionCount / 5);

    const handleNext = () => {
      // wrap around if > pagemax
      let updatedIndex = startIndex + 5;
      if(updatedIndex >= questionCount){
        updatedIndex = 0;
      }
      setStartIndex(updatedIndex);
    }

    const handleFilter = (e) => {
       setOption(e);
    }

    const handlePrev = () => {
      // if page is 1 then dont work
      // else go back 5
      if(currentPage != 1){
        let updatedIndex = startIndex - 5;
        setStartIndex(updatedIndex);
      }
    }
    

    const questionCountText = questionCount === 1 ? "question" : "questions";
    return (
    <div className="questionBanner">
        <div className="leftSection">
          <div id="allQuestionsText">{allQuestionsText}</div>
          <span className="questionCountText">{questionCount} {questionCountText}</span>
        </div>
        <div className="middleSection">
          {currentPage !== 1 ?
          (<button id="themeButtonPrevOn" onClick={handlePrev}> Prev</button>)
          :
          (<button id="themeButtonPrevOff"> Prev</button>)}
          <div className="themePageIndex">{currentPage} / {lastPage}</div>
          <button id="themeButtonNext" onClick={handleNext}> Next</button>
        </div>
        <div className="rightSection">
          <button id="themeButtonAskQuestion" onClick={handleClick}> Ask Question</button>
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