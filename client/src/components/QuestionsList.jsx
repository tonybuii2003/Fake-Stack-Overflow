import React, {useEffect} from 'react';
import '../stylesheets/QuestionsList.css';
import {displayQuestionDate} from '../utils/displayDate';
function QuestionsList({questions, tags, setAllTags, showQuestionAndAnswersFunc, setCurrentQID, option, setAllQuestions, currentSearchQuery, onSubmitSearch, setSavedDisplayedQuestionCount, startIndex, setStartIndex}) {
  const questionMatchesSearchQuery = (question, keywords, queryTags) => {
    // Try to match by tags
    for(const tag of queryTags){
      if(question.tags.some(questionTag => questionTag._id === tag)){
        return true;
      }
    }
    // No tags matched so try keywords now
    let questionsTitleWords = question.title.toLowerCase().split(' ').map(questionWord => questionWord.replace(/[^a-zA-Z0-9]/g, ""));
    let questionsTextWords = question.text.toLowerCase().split(' ').map(questionWord => questionWord.replace(/[^a-zA-Z0-9]/g, ""));

    for (const keyword of keywords) {
      // In title
      if (questionsTitleWords.includes(keyword.toLowerCase())) {
          return true;
      }
      // In text
      if(questionsTextWords.includes(keyword.toLowerCase())){
        return true;
      }
    }
    // No match so return false
    console.log(false);
    return false;
  }

  const sortQuestionsBySearch = () => {
    const tagRegex = /^\[.*\]$/;
    let querySplit = currentSearchQuery.split(' ');
    let queryTags = querySplit
      .filter(element => tagRegex.test(element))
      .map(tag => tag.substring(1, tag.length - 1))
      .map(tagName => {
          const tagObject = tags.find(tagInList => tagInList.name === tagName);
          return tagObject ? tagObject._id : null; // Return _id if tagObject is found, otherwise null
      });
    let queryKeywords = querySplit.filter(element => !tagRegex.test(element));
    return [...questions].filter(question => {
      return questionMatchesSearchQuery(question, queryKeywords, queryTags);
    });
  };
  
  if(currentSearchQuery !== undefined && currentSearchQuery !== 'null'){
    questions = sortQuestionsBySearch();
  }
  
  const handleClick = (qid) => {
    setCurrentQID(qid);
    showQuestionAndAnswersFunc();
  }
  
  const sortQuestionsByNewest = (questions) => {
    return [...questions].sort((a, b) => new Date(b.ask_date_time) - new Date(a.ask_date_time));
  };
  const filterUnansweredQuestions = (questions) => {
    return [...questions].filter(q => q.answers.length === 0);
  };
  const sortQuestionsByActive = (questions) => {
    return [...questions].sort((a, b) => {
   
      const aHasAnswers = a.answers.length > 0;
      const bHasAnswers = b.answers.length > 0;
      
      // Prioritize questions with answers over those without
      if (!aHasAnswers && bHasAnswers) {
          return 1;  // b should come before a
      }
      if (aHasAnswers && !bHasAnswers) {
          return -1; // a should come before b
      }
      
      let aMostRecentDate = aHasAnswers
        ? new Date(Math.max(...a.answers.map(answer => new Date(answer.ans_date_time))))
        : new Date(a.ask_date_time);
      let bMostRecentDate = bHasAnswers
        ? new Date(Math.max(...b.answers.map(answer => new Date(answer.ans_date_time))))
        : new Date(b.ask_date_time);
  
      
      return bMostRecentDate - aMostRecentDate;
    });
  };
  useEffect(() => {
    let processedQuestions = questions;
    let endIndex = startIndex + 5;
    processedQuestions = processedQuestions.slice(startIndex, endIndex);
    setAllQuestions(processedQuestions);
    setAllTags(tags);

  }, [option,  onSubmitSearch]); 
  console.log(option);
  let end = startIndex + 5;
  switch (option) {
    case 'newest':
      questions = sortQuestionsByNewest(questions);
      questions = questions.slice(startIndex, end);
      break;
    case 'unanswered':
      setStartIndex(0);
      questions = filterUnansweredQuestions(questions);
      questions = questions.slice(startIndex, end);
      break;
    case 'active':
      questions = sortQuestionsByActive(questions);
      questions = questions.slice(startIndex, end);
      break;
    case 'search':
      questions = sortQuestionsBySearch();
      questions = questions.slice(startIndex, end);
      break;
    default:
      break;
  }
  console.log(questions.length);
  if (questions.length === 0) {
    return (
        <h1 className="noQuestionsFound">No Questions Found</h1>
    );
  }
  setSavedDisplayedQuestionCount(questions.length);
  if (!questions) return <div id="loading">Loading...</div>;
     return (
        <div className="questionsList">
          {questions.map((question) => {
            const answerCountText = question.answers.length === 1 ? "answer" : "answers";
            const viewCountText = question.views === 1 ? "view" : "views";
            const askDateFormatted = displayQuestionDate(question.ask_date_time);
            const tagsHtml = question.tags.map(tag => (
              <span className="tag" key={tag._id}>{tag.name}</span>
            ));
             return (
              <div className="question" key={question._id}> 
                <div className="question-stats-stack"> 
                  <div className="question-stats">{question.answers.length} {answerCountText}</div>
                  <div className="question-stats">{question.views} {viewCountText}</div>
                </div>
                <div className="question-title-stack"> 
                  <h3 className="questionLink" onClick={()=>handleClick(question._id)}>{question.title} </h3>
                  <div className="question-tags">{tagsHtml}</div>
                </div>
                <div className="question-meta"> 
                  <span style={{color: "red"}}>{question.asked_by}</span> 
                  <span style={{color: "grey"}}> asked {askDateFormatted}</span>
                </div>
              </div>
            );
          })}
        </div>
    )
}
export default QuestionsList;