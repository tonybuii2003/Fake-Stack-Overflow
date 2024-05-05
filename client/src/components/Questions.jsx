import React, { useEffect, useState } from 'react';
import '../stylesheets/Questions.css';
import QuestionBanner from './QuestionBanner';
import QuestionList from './QuestionsList';
import axios from 'axios';
function Questions({showQuestionFormFunc, showQuestionAndAnswersFunc, setCurrentQID, showSearchResults, option, setOption, currentSearchQuery, currentSearchTag, onSubmitSearch}) {
  const [allQuestions, setAllQuestions] = useState([]); 
  const [startIndex, setStartIndex] = useState(0);
  const [savedDisplayedQuestionCount, setSavedDisplayedQuestionCount] = useState(0); 
  const [allTags, setAllTags] = useState([]); 
  useEffect(() => {
    
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tag');
        setAllTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/question');
        setAllQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchTags();
    fetchQuestions();
  }, [allQuestions]); 

  return (
    <div className="questions">
      <QuestionBanner 
        questions={allQuestions}
        tags={allTags} 
        showQuestionFormFunc={showQuestionFormFunc}
        setOption={setOption}
        showSearchResults={showSearchResults}
        currentSearchTag={currentSearchTag}
        onSubmitSearch={onSubmitSearch}
        setAllQuestions={setAllQuestions}
        savedDisplayedQuestionCount={savedDisplayedQuestionCount}
        startIndex={startIndex}
        setStartIndex={setStartIndex}
        />
      <QuestionList questions={allQuestions}
                    tags={allTags} 
                    setAllTags= {setAllTags}
                    showQuestionAndAnswersFunc={showQuestionAndAnswersFunc}
                    setCurrentQID = {setCurrentQID}
                    option = {option}
                    setAllQuestions = {setAllQuestions}
                    currentSearchQuery={currentSearchQuery}
                    onSubmitSearch={onSubmitSearch}
                    setSavedDisplayedQuestionCount={setSavedDisplayedQuestionCount}
                    startIndex={startIndex}
                    setStartIndex={setStartIndex}/>
      
    </div>
    
  );
}

export default Questions;
