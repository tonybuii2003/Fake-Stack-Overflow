import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileQuestionsList from './ProfileQuestionList';
import ProfileTagsList from './ProfileTagsList';
import '../stylesheets/Profile.css';
import User from '../'
export default function Profile({showEditFormFunc, userToken, setCurrentQID, asGuest, showTagEditFormFunc, setCurrentTID}) {
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await axios.get(`http://localhost:8000/user/${userToken.userId}`);
            console.log("userData: ", userData.data);
            setUser(userData.data);
            const userQuestions = await axios.get(`http://localhost:8000/question/byuser/${userData.data.email}`);
            setQuestions(userQuestions.data);
            const userTags = await axios.get(`http://localhost:8000/tag/byowner/${userData.data.email}`);
            setTags(userTags.data);
            setLoading(false);
        };

        if (userToken && userToken.userId) {
            fetchUserData();
        }
        else if(asGuest){
            setLoading(false);
        }
    }, [userToken, userToken.userId]);
    console.log("Tags of owner:", tags);
    if (loading) return <p id='loading'>Loading...</p>;
    return (
        <div className='profile'>
            <div className="profileSection">
                <div className="profileText">User Profile</div>
                {!asGuest ? (
                    <div className="profile">
                        <div className="profileNameText">{user.username}</div>
                        <div className="userDetails">
                            <p>Member since: {new Date(user.creation_date).toLocaleDateString()}</p>
                            <p>Reputation: {user.reputation}</p>
                        </div>
                    </div>
                ) : (
                    <div className="profile">
                        <div className="profileGuestText">You're a guest!</div> 
                        <div className="userDetails">
                            <p>You are not logged in. To view your user profile, register and then login.</p>
                        </div>
                    </div>
                )}
            </div>
            {!asGuest && 
                <div className="userActivity">
                    <div className="questionsProfile">
                        <div className="questionBannerProfile">Your Questions</div>
                        <ProfileQuestionsList showEditFormFunc ={showEditFormFunc} setCurrentQID={setCurrentQID} questions={questions}/>
                    </div>
                    <div className="tagsProfile">
                        <div className="tagBannerProfile">Your Tags</div>
                        <ProfileTagsList tags={tags} showTagEditFormFunc={showTagEditFormFunc} setCurrentTID={setCurrentTID} />
                    </div>
                </div>
            }
        </div>
    );
}