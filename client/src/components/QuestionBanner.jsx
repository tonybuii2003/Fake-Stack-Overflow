import React from 'react';
import '../stylesheets/QuestionBanner.css';

function QuestionBanner({questions, tags, showQuestionFormFunc, setOption, showSearchResults, currentSearchTag, onSubmitSearch, setAllQuestions, savedDisplayedQuestionCount}) {
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
    
    
    const questionCountText = questionCount === 1 ? "question" : "questions";
    return (
    <div className="questionBanner">
        <div className="leftSection">
          <h1 id="allQuestionsText">{allQuestionsText}</h1>
          <span className="questionCountText">{questionCount} {questionCountText}</span>
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