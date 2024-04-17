import React from 'react';
import '../stylesheets/TagsList.css';
import '../stylesheets/TagBanner.css';
function TagsList({tags, questions, setShowSearchResults, setCurrentSearchQuery, showQuestionsSearchFunc, setCurrentSearchTag}) { 
    const handleClickTag = (tid) => {
      const queriedTag = tags.find(tag => tag._id === tid);
      // TagQueryName should not be null
      const completeTagQuery = "[" + queriedTag.name + "]";
      setCurrentSearchQuery(completeTagQuery);
      setCurrentSearchTag(queriedTag.name);
      setShowSearchResults(true);
      showQuestionsSearchFunc();
    }
    return (
        <div className="tagsContainer">
          {tags.map((tag) => {
            const questionCount = questions.filter(question => question.tags.some(questionTag => questionTag._id === tag._id)).length;
            const questionCountText = questionCount === 1 ? "question" : "questions";
            return (
                <div className="tagCell" key={tag._id}>
                    <div className="tagCellTitle" onClick={()=>handleClickTag(tag._id)}>{tag.name}</div>
                    <div className="tagCellQuestionCount">{questionCount} {questionCountText}</div>
                </div>
            );
          })}
        </div>
    )
}

export default TagsList;