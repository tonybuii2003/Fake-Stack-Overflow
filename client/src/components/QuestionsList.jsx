import React, { useEffect, useState } from 'react';
import '../stylesheets/QuestionsList.css';
import { displayQuestionDate } from '../utils/displayDate';

function QuestionsList({ questions, tags, showQuestionAndAnswersFunc, setCurrentQID, option, currentSearchQuery, setSavedDisplayedQuestionCount, currentPage, setCurrentPage, currentTotalPages, setCurrentTotalPages}) {
    const [filteredQuestions, setFilteredQuestions] = useState([]);

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
    // Effect to sort and filter questions based on the current option and search query
    useEffect(() => {
        let processedQuestions = sortAndFilterQuestions(questions, option, currentSearchQuery, tags);
        setFilteredQuestions(processedQuestions);

        console.log("Filtered questions: ", processedQuestions);
        setCurrentPage(0);
        const lastPage = Math.ceil(processedQuestions.length / 5);
        setCurrentTotalPages(lastPage);

        setSavedDisplayedQuestionCount(processedQuestions.length);
    }, [questions, option, currentSearchQuery, tags, setSavedDisplayedQuestionCount]);

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

    const handleClick = (qid) => {
        setCurrentQID(qid);
        showQuestionAndAnswersFunc();
    };

    if (!filteredQuestions || filteredQuestions.length === 0) {
        return <h1 className="noQuestionsFound">No Questions Found</h1>;
    }

    return (
        <div className="questionsList">
            {filteredQuestions.map(question => (
                <div className="question" key={question._id}>
                    <div className="question-stats-stack">
                        <div className="question-stats">{question.answers.length} {question.answers.length === 1 ? "answer" : "answers"}</div>
                        <div className="question-stats">{question.views} {question.views === 1 ? "view" : "views"}</div>
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
