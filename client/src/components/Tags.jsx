import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylesheets/Tags.css';
import '../stylesheets/TagsList.css';
import TagBanner from './TagBanner';
import TagsList from './TagsList';

function Tags({setShowSearchResults, showQuestionFormFunc, setCurrentSearchQuery, showQuestionsSearchFunc, setCurrentSearchTag, user}) {
    const [allTags, setAllTags] = useState([]); 
    const [allQuestions, setAllQuestions] = useState([]); 
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const tagsPerPage = 5;
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
          console.error('Error fetching tags:', error);
        }
      };
      fetchTags();
      fetchQuestions();
    }, []); 
    useEffect(() => {
      setTotalPages(Math.ceil(allTags.length / tagsPerPage));
      setCurrentPage(currentPage);
    }, [allTags]);
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
    return (
        <div className="tags">
            <TagBanner 
          tags={allTags} 
          showQuestionFormFunc={showQuestionFormFunc}
          user={user}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePages={handlePages}
          />
        <TagsList tags={allTags.slice(currentPage * tagsPerPage, (currentPage + 1) * tagsPerPage)}
          questions={allQuestions}
          setShowSearchResults={setShowSearchResults}
          setCurrentSearchQuery={setCurrentSearchQuery}
          showQuestionsSearchFunc={showQuestionsSearchFunc}
          setCurrentSearchTag={setCurrentSearchTag}
          />
        </div>
  );
}

export default Tags;