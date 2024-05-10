import React from 'react';
import '../stylesheets/TagBanner.css';
import '../stylesheets/TagsList.css';

function TagBanner({tags, showQuestionFormFunc, user, currentPage, totalPages, handlePages}) {

    const handleDeny = (reason) => {
        alert("You must be logged in to " + reason + "!\nPlease login or register first.");
    }
    const handleClick = () => {
        showQuestionFormFunc();
    }
    const tagCount = tags.length;
    const tagCountText = tagCount === 1 ? "tag" : "tags";
    const userGuest = user.isGuest;
    return (
    <div className="tagBanner">
        <div className="leftSectionTags">
            <h1 className="allTagsText">All Tags</h1>
            <span className="tagCountText">{tagCount} {tagCountText}</span>
        </div>
        {totalPages === 0 ? null : 
        <div className="middleSection">
            <button id="themeButtonPrevOn" 
                disabled={currentPage === 0}
                onClick={() => handlePages('prev')}>
              Prev
            </button>
            <div className="themePageIndex">{currentPage + 1} / {totalPages}</div>
            <button id="themeButtonNext" 
                  
                  onClick={() => handlePages('next')}>
              Next
            </button>
        </div>
        }
        <div className="rightSection">
        {!userGuest ? 
          (<button id="themeButtonAskQuestion" onClick={handleClick}> Ask Question</button>
          ) 
          : 
          (<button id="themeButtonAskQuestionInactive" onClick={() => handleDeny("ask a question")}> Ask Question</button>
          )}
        </div>
    </div>
    )
}
export default TagBanner;