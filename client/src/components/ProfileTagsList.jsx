import React from 'react';
import '../stylesheets/TagsList.css';
import axios from 'axios';

function ProfileTagsList({ tags, showTagEditFormFunc, setCurrentTID}) {
    const handleClick = async (tid) => {
        //res.status(200).json({matches.length});
        console.log("Handling tid", tid);
        const amountUsed = await fetchTagUsageAmount(tid);
        if(amountUsed !== 0){
            if(amountUsed === 1){
                alert(`1 other question still uses this tag!\nIt cannot be edited or deleted at this time.`);
            }
            else {
                alert(`${amountUsed} other questions still use this tag!\nIt cannot be edited or deleted at this time.`);
            }
        }
        else {
            setCurrentTID(tid);
            showTagEditFormFunc();
        }
    };
    const fetchTagUsageAmount = async (tagId) => {
        try {
            const response = await axios.get(`http://localhost:8000/tag/${tagId}/usages`);
            return response.data; // Return response data
        } catch (error) {
            console.error('Error fetching tag usage amount:', error);
        }
    }

    if (!tags || tags.length === 0) {
        return <h1 className="noTagsFound">No Tags Found</h1>;
    }

    return (
        <div className="tagsList">
            {tags.map(tag => (
                <div className="tagItem" key={tag._id}>
                    <div className="tag-link-stack">
                        <h3 className="tagLink" onClick={() => handleClick(tag._id)}>[{tag.name}]</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProfileTagsList;
