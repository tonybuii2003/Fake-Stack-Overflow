import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylesheets/Profile.css';
import User from '../'
export default function AdminUserProfile({}) {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const usersData = await axios.get(`http://localhost:8000/user/all`);
            console.log("userData: ", usersData.data);
            setUsers(usersData.data);
            setLoading(false);
        };
    }, [setUsers, users, setLoading, loading]);
    if (loading) return <p id='loading'>Loading...</p>;
    return (
        <div className='profile'>
            <p>test</p>
            {/* <div className="profileSection">
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
                    <div className="questionBannerProfile">Questions Answered By You</div>
                    <AnsweredQuestionsList showQuestionAndAnswersFunc ={showQuestionAndAnswersFunc} setCurrentQID={setCurrentQID} questions={questionAnswered}/>
                </div>
            } */}
        </div>
    );
}