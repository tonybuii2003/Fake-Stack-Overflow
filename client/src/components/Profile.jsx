import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileQuestionsList from './ProfileQuestionList';
import '../stylesheets/Profile.css';
import User from '../'
export default function Profile({showEditFormFunc, userToken, setCurrentQID, asGuest}) {
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await axios.get(`http://localhost:8000/user/${userToken.userId}`);
            console.log("userData: ", userData.data);
            setUser(userData.data);
            const userQuestions = await axios.get(`http://localhost:8000/question/byuser/${userData.data.email}`);
            setQuestions(userQuestions.data);
            setLoading(false);
        };

        if (userToken && userToken.userId) {
            fetchUserData();
        }
        else if(asGuest){
            setLoading(false);
        }
    }, [userToken, userToken.userId]);
    if (loading) return <p id='loading'>Loading...</p>;
    return (
        <div className='profile'>
            <div className="profileSection">
                <div className="profileText">User Profile</div>
                {!asGuest ? (
                    <div className="profile">
                        <h2 style={{color: "#007bff"}}>{user.first_name} {user.last_name}</h2>
                        <div className="userDetails">
                            <p>Member since: {new Date(user.creation_date).toLocaleDateString()}</p>
                            <p>Reputation: {user.reputation}</p>
                        </div>
                    </div>
                ) : (
                    <div className="profile">
                        <h2>You're a guest!</h2> 
                        <div className="userDetails">
                            <p>You are not logged in. To view your user profile, register and then login.</p>
                        </div>
                    </div>
                )}
            </div>
            {!asGuest && 
                <div className="questionsProfile">
                    <div className="questionBannerProfile">Your Questions</div>
                    <ProfileQuestionsList showEditFormFunc ={showEditFormFunc} setCurrentQID={setCurrentQID} questions={questions}/>
                </div>}
        </div>
    );
}