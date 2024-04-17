import React from 'react';
import '../stylesheets/TagBanner.css';
import '../stylesheets/TagsList.css';

function TagBanner({tags, showQuestionFormFunc}) {
    const handleClick = () => {
        showQuestionFormFunc();
    }
    const tagCount = tags.length;
    const tagCountText = tagCount === 1 ? "Tag" : "Tags";
    return (
    <div className="tagBanner">
        <div className="leftSectionTags">
            <h1 className="allTagsText">All Tags</h1>
        </div>
        <span className="tagCountText">{tagCount} {tagCountText}</span>
        <div className="rightSection">
          <button id="themeButtonAskQuestion" onClick={handleClick}> Ask Question</button>
        </div>
    </div>
    )
}
export default TagBanner;