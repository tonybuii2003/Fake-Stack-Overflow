import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylesheets/Tags.css';
import '../stylesheets/TagsList.css';
import TagBanner from './TagBanner';
import TagsList from './TagsList';

function Tags({setShowSearchResults, showQuestionFormFunc, setCurrentSearchQuery, showQuestionsSearchFunc, setCurrentSearchTag, user}) {
    const [allTags, setAllTags] = useState([]); 
    const [allQuestions, setAllQuestions] = useState([]); 
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
    return (
        <div className="tags">
            <TagBanner 
          tags={allTags} 
          showQuestionFormFunc={showQuestionFormFunc}
          user={user}
          />
        <TagsList tags={allTags} 
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