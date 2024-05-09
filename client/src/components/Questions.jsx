import React, { useEffect, useState } from 'react';
import '../stylesheets/Questions.css';
import QuestionBanner from './QuestionBanner';
import QuestionList from './QuestionsList';
import axios from 'axios';
function Questions({showQuestionFormFunc, showQuestionAndAnswersFunc, setCurrentQID, showSearchResults, option, setOption, currentSearchQuery, currentSearchTag, onSubmitSearch, user}) {
  const [allQuestions, setAllQuestions] = useState([]); 
  const [allTags, setAllTags] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const questionsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
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
    }

    fetchData();
    setLoading(false);
  }, []); 
  useEffect(() => {
    setTotalPages(Math.ceil(filteredQuestions.length / questionsPerPage));
  }, [filteredQuestions, questionsPerPage]);


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
      
      if (!aHasAnswers && bHasAnswers) {
          return 1;  
      }
      if (aHasAnswers && !bHasAnswers) {
          return -1; 
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
  // Effect to sort and filter questions based on the current option and search query
  useEffect(() => {
      let processedQuestions = sortAndFilterQuestions(allQuestions, option, currentSearchQuery, allTags);
      setFilteredQuestions(processedQuestions);
      setQuestionCount(processedQuestions.length);
      setTotalPages(Math.ceil(processedQuestions.length / questionsPerPage));
      setCurrentPage(0);
      console.log("Filtered questions: ", processedQuestions);

  }, [allQuestions, option, currentSearchQuery, allTags]);
  // Sorting and filtering functions
  const sortAndFilterQuestions = (questions, option, searchQuery, tags) => {
      let result = [...questions];

      // Filter by search query first if there is a query
      if (searchQuery && searchQuery !== 'null') {
          result = filterBySearchQuery(result, searchQuery, tags);
      }
      // Then sort by the selected option
      switch (option) {
          case 'newest':
              return sortQuestionsByNewest(result);
          case 'unanswered':
              return filterUnansweredQuestions(result);
          case 'active':
              return sortQuestionsByActive(result);
          default:
              return result;
      }
  };

  const filterBySearchQuery = (questions, searchQuery, tags) => {
      const tagRegex = /^\[.*\]$/;
      let querySplit = searchQuery.split(' ');
      let queryTags = querySplit
          .filter(element => tagRegex.test(element))
          .map(tag => tag.substring(1, tag.length - 1))
          .map(tagName => tags.find(tag => tag.name === tagName)?._id)
          .filter(id => id !== undefined);
      
      let queryKeywords = querySplit.filter(element => !tagRegex.test(element)).map(kw => kw.toLowerCase());

      return questions.filter(question => {
          return question.tags.some(tag => queryTags.includes(tag._id)) ||
                 queryKeywords.some(kw => question.title.toLowerCase().includes(kw) || question.text.toLowerCase().includes(kw));
      });
  };

  const handlePages = (direction) => {
    setCurrentPage(prev => {
        if (direction === 'next') {
            return (prev + 1) % totalPages;
        } else if (direction === 'prev') {
            return (prev - 1 + totalPages) % totalPages;
        }
        return prev;
    });
  };
  if (loading) return <p id='loading'>Loading...</p>;
  return (
    <div className="questions">
      <QuestionBanner 
        questions={filteredQuestions}
        tags={allTags} 
        showQuestionFormFunc={showQuestionFormFunc}
        setOption={setOption}
        showSearchResults={showSearchResults}
        currentSearchTag={currentSearchTag}
        onSubmitSearch={onSubmitSearch}
        setAllQuestions={setAllQuestions}
        questionCount={questionCount}
        setQuestionCount={setQuestionCount}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePages={handlePages}
        user={user}
        />
      <QuestionList 
                    filteredQuestions={filteredQuestions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)}
                    tags={allTags} 
                    setAllTags= {setAllTags}
                    showQuestionAndAnswersFunc={showQuestionAndAnswersFunc}
                    setCurrentQID = {setCurrentQID}
                    option = {option}
                    setAllQuestions = {setAllQuestions}
                    currentSearchQuery={currentSearchQuery}
                    onSubmitSearch={onSubmitSearch}
                    />
    </div>
    
  );
}

export default Questions;