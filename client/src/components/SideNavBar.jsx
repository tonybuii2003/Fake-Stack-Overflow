import React, {useEffect, useState} from 'react';
import '../stylesheets/SideNavBar.css';
import Tags from '../components/Tags';
import Questions from '../components/Questions';
import QuestionForm from './QuestionForm';
import QuestionAndAnswers from './QuestionAndAnswers';
import AnswerForm from './AnswerForm';
import Profile from './Profile';
import QuestionEditForm from './QuestionEditForm';
import TagEditForm from './TagEditForm';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
function SideNavBar({showQuestions, setShowQuestions, 
    showTags, setShowTags, 
    showProfile, setShowProfile,
    showSearchResults, setShowSearchResults, 
    currentSearchQuery, 
    setCurrentSearchQuery, currentSearchTag, 
    setCurrentSearchTag, onSubmitSearch, isLoggedInOrGuest, setTryLogin, tryLogin, user}) {
    const [option, setOption] = useState('newest');
    const [questionFormOpened, setQuestionFormOpened] = useState(false);
    const [questionBackgroundColor, setQuestionBackgroundColor] = useState('#d2d2d2');
    const [tagsBackgroundColor, setTagsBackgroundColor] = useState('#ffffff');
    const [profileBackgroundColor, setProfileBackgroundColor] = useState('#ffffff');
    const [showQuestionAndAnswers, setQuestionAndAnswers] = useState(false);
    const [showAnswerForm, setShowAnswerForm] = useState(false);
    const [currentQID, setCurrentQID] = useState('null');
    const [currentTID, setCurrentTID] = useState('null');
    const [showEditForm, setShowEditForm] = useState(false);
    const [showTagEditForm, setShowTagEditForm] = useState(false);
    const [currentUsername, setCurrentUsername] = useState('null');
    const navigate = useNavigate();
    console.log("current user: ", user);
    useEffect(() => {
        showQuestionsSearchFunc();
      }, [onSubmitSearch]); 
    
      const fetchDetails = async (req, res) => {
        try {
          console.log(`http://localhost:8000/user/${user.userId}/username`);
          const response = await axios.get(`http://localhost:8000/user/${user.userId}/username`);
          setCurrentUsername(response.data);
        } catch (error) {
          console.error('Failed to fetch details:', error);
        }
    }
    fetchDetails();
    function showQuestionsFunc() {
        setShowQuestions(true);
        setShowSearchResults(false);
        setShowTags(false);
        setCurrentSearchQuery('null');
        setQuestionFormOpened(false);
        setQuestionBackgroundColor('#d2d2d2');
        setTagsBackgroundColor('#ffffff');
        setProfileBackgroundColor('#ffffff');
        setQuestionAndAnswers(false);
        setShowAnswerForm(false);
        setShowProfile(false);
        setShowEditForm(false);
        setShowTagEditForm(false);
    }
    function showTagsFunc() {
        setShowTags(true);
        setShowQuestions(false);
        setShowSearchResults(false);
        setShowAnswerForm(false);
        setCurrentSearchQuery('null');
        setQuestionFormOpened(false);
        setQuestionBackgroundColor('#ffffff');
        setProfileBackgroundColor('#ffffff');
        setTagsBackgroundColor('#d2d2d2');
        setQuestionAndAnswers(false);
        setShowAnswerForm(false);
        setShowProfile(false);
        setShowEditForm(false);
        setShowTagEditForm(false);
    }
    function showQuestionsSearchFunc(){
        setShowTags(false);
        setShowQuestions(true);
        setShowAnswerForm(false);
        setQuestionFormOpened(false);
        setQuestionAndAnswers(false);
        setShowAnswerForm(false);
        setShowEditForm(false);
        setShowTagEditForm(false);
        setShowProfile(false);
    }
    function showQuestionFormFunc() {
        setShowQuestions(false);
        setShowSearchResults(false);
        setCurrentSearchQuery('null');
        setShowTags(false);
        setQuestionFormOpened(true);
        setQuestionAndAnswers(false);
        setShowAnswerForm(false);
        setShowEditForm(false);
        setShowTagEditForm(false);
        setShowProfile(false);
    }
    function showAnswerFormFunc() {
        setShowAnswerForm(true);
        setShowTags(false);
        setQuestionAndAnswers(false);
        setQuestionFormOpened(false);
        setShowQuestions(false);
        setShowEditForm(false);
        setShowTagEditForm(false);
        setShowProfile(false);
    }
    function showQuestionAndAnswersFunc() {
        setQuestionAndAnswers(true);
        setShowTags(false);
        setQuestionFormOpened(false);
        setShowQuestions(false);
        setShowAnswerForm(false);
        setShowEditForm(false);
        setShowTagEditForm(false);
        setShowProfile(false);
    }
    function showProfileFunc() {
        setShowProfile(true);
        setShowTags(false);
        setQuestionFormOpened(false);
        setShowQuestions(false);
        setShowAnswerForm(false);
        setProfileBackgroundColor('#d2d2d2');
        setQuestionBackgroundColor('#ffffff');
        setTagsBackgroundColor('#ffffff');
        setShowEditForm(false);
        setQuestionAndAnswers(false);
        setShowTagEditForm(false);
    }
    function showEditFormFunc() {
        setShowEditForm(true);
        setShowTags(false);
        setQuestionFormOpened(false);
        setShowQuestions(false);
        setShowAnswerForm(false);
        setShowProfile(false);
        setShowTagEditForm(false);
    }

    function showTagEditFormFunc() {
        setShowTagEditForm(true);
        setShowEditForm(false);
        setShowTags(false);
        setQuestionFormOpened(false);
        setShowQuestions(false);
        setShowAnswerForm(false);
        setShowProfile(false);
    }

    const handleClickTagsBtn = () => {
        setOption('newest');
        showTagsFunc()
    }
    const handleClick = () => {
        setOption('newest');
        showQuestionsFunc()
        console.log("showQuestions: ", showQuestions);
    };
    const handleClickProfileBtn = () => {
        showProfileFunc();
        
    }
    const handleLoginAsGuest = () => {
        window.location.reload();
        navigate('/');
    }
    const handleLogout = async () => {
        try{
            console.log("Logging out...");
            const response = await axios.post('http://localhost:8000/user/logout');
            console.log("Logout successful:", response.data);
            setTryLogin(!tryLogin)
            if (response.status === 200) {
                window.location.reload();
                navigate('/');
            }
            
        } catch (error) {
            console.error('Logout error:', error);
            alert("Logout failed, please try again.");
        }
        
    };
    return (
        <div className="contentWrapper">
            <div className="sidebarNav">
                <button id="buttonQuestions" className="buttonQuestions"
                    style={{backgroundColor: questionBackgroundColor}}
                    onClick={handleClick}>
                    Questions
                </button>
                <button id="buttonTags" className="buttonTags"
                style={{backgroundColor: tagsBackgroundColor}}
                onClick={handleClickTagsBtn}>
                    Tags
                </button>
                <button id="buttonProfile" className="buttonTags"
                style={{backgroundColor: profileBackgroundColor}}
                onClick={handleClickProfileBtn}>
                    Profile
                </button>
                <hr className="divider"/>
                {user.isGuest && (
                    <div className="guestHome">
                        <span id="welcomeMessage">Welcome, Guest!</span>
                        <button onClick={handleLoginAsGuest} className="loginButton">Login</button>
                    </div>
                )}
                {!user.isGuest && (
                    <p id="welcomeMessage">Welcome {currentUsername}!</p>
                )}
                {user.isLoggedIn && (
                <button onClick={handleLogout} className="logoutButton">Logout</button>
            )}
            </div>
            {showQuestions && 
            <Questions 
                showQuestionFormFunc = {showQuestionFormFunc}
                showQuestionAndAnswersFunc = {showQuestionAndAnswersFunc}
                setCurrentQID = {setCurrentQID}
                showSearchResults = {showSearchResults}
                option={option}
                setOption={setOption}
                currentSearchQuery={currentSearchQuery}
                currentSearchTag={currentSearchTag}
                onSubmitSearch={onSubmitSearch}
                setTryLogin = {setTryLogin}
                tryLogin = {tryLogin}
                user={user}
                />}
            {questionFormOpened && <QuestionForm showQuestionsFunc = {showQuestionsFunc} user={user}/> }
            {showQuestionAndAnswers && <QuestionAndAnswers 
                                        qid = {currentQID}  
                                        showQuestionFormFunc = {showQuestionFormFunc}
                                        showAnswerFormFunc = {showAnswerFormFunc}
                                        user={user}/>}
            {showAnswerForm && <AnswerForm 
                                qid = {currentQID} 
                                showQuestionAndAnswersFunc = {showQuestionAndAnswersFunc} user={user}/>}
            {showEditForm && <QuestionEditForm
                                questionId = {currentQID}
                                showProfileFunc = {showProfileFunc}
                                showEditFormFunc = {showEditFormFunc}
                                
                                user={user}
                                />}
            {showTagEditForm && <TagEditForm 
                tagId={currentTID} 
                showProfileFunc={showProfileFunc}
                showTagEditFormFunc={showTagEditFormFunc} 
                setCurrentTID={setCurrentTID}
                />}
            {showTags &&
            <Tags
                setShowSearchResults={setShowSearchResults}
                showQuestionFormFunc={showQuestionFormFunc}
                setCurrentSearchQuery={setCurrentSearchQuery}
                showQuestionsSearchFunc={showQuestionsSearchFunc}
                setCurrentSearchTag={setCurrentSearchTag}
                user={user}
                />}

            {showProfile && <Profile showEditFormFunc={showEditFormFunc} showQuestionAndAnswersFunc = {showQuestionAndAnswersFunc} setCurrentQID={setCurrentQID} userToken={user} asGuest={user.isGuest} showTagEditFormFunc={showTagEditFormFunc} setCurrentTID={setCurrentTID}/>}
            
        </div>
    );
}

export default SideNavBar;
