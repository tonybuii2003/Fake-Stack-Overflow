import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileQuestionsList from './ProfileQuestionList';
import '../stylesheets/Profile.css';
export default function Profile({showEditFormFunc, userToken, setCurrentQID}) {
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("not fetched yet");
    const userId = userToken.userId;
    useEffect(() => {
        console.log("Effect running", userToken);
        console.log("Fatch please !");
        const fetchUserData = async () => {
            const userData = await axios.get(`http://localhost:8000/user/${userId}`);
            console.log("userData: ", userData.data);
            setUser(userData.data);
            const userQuestions = await axios.get(`http://localhost:8000/question/byuser/${userData.data.email}`);
            setQuestions(userQuestions.data);
            setLoading(false);
        };
        fetchUserData();
        setError("fetched");
    }, []);
    // console.log("User: ", user, userId);
    if (loading) return <p id='loading'>Loading...</p>;
    console.log("erreor: ", error)
    return (
        <div className='profile'>
            
            <div className="profileSection">
                <h1>User Profile</h1>
                <h2>Welcome, {user.first_name} {user.last_name}</h2>
                <div className="userDetails">
                        <p>Member since: {new Date(user.creation_date).toLocaleDateString()}</p>
                        <p>Reputation: {user.reputation}</p>
                </div>
            </div>
            <div className="questionsProfile">
                <div className="questionBannerProfile">

                <h2>Your Questions</h2>
                </div>
                
                <ProfileQuestionsList showEditFormFunc ={showEditFormFunc} setCurrentQID={setCurrentQID} questions={questions}/>
            </div>
            <div>
                
            </div>
        </div>
    );
}