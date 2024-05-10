import React, { useState } from 'react';
import '../stylesheets/Form.css';
import '../stylesheets/UserLoginRegisterForms.css';
import axios from 'axios';
function UserRegisterForm({switchSubpageFunc}) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');

  const handleClick = (buttonId) => {
    if(buttonId !== undefined){
      switch(buttonId){
        case "login":
            switchSubpageFunc("login");
            break;
        case "guest":
            switchSubpageFunc("guest");
            break;
        default:
            break;
      }
    }
  }

  const registerNewUser = async (username, email, password, passwordVerify) => {
    let usernameTrim = username.trim();
    let emailTrim = email.trim();
    let passwordTrim = password.trim();
    let passwordVerifyTrim = passwordVerify.trim();
    if(passwordTrim !== passwordVerifyTrim){
        alert('Your passwords do not match!');
        return;
    }
    
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(emailRegex.test(emailTrim)){
        try {
            await axios.post(`http://localhost:8000/register`, {
              username: usernameTrim,
              email: emailTrim,
              password: passwordTrim,
            });
            switchSubpageFunc("login");
        } catch (error) {
            console.error('Failed to register user:', error);
            alert('Error registering user: ' + (error.response?.data?.message || error.message));
        }
    }
    else {
        alert('Invalid email');
    }
  };

  const handleVerificationBox = (e) => {
    const textPass = document.getElementById("passwordVerification");
    const text = document.getElementById("passwordVerificationStatus");
    if(e !== password && e !== '' && e !== undefined && textPass.textContent !== undefined){
        text.style.display = "block";
        text.style.color = "red";
        text.style.paddingBottom = 0;
        text.textContent = "Passwords do not match!";
        document.getElementById("post-box").style.paddingTop = 0;
    }
    else {
        document.getElementById("post-box").style.paddingTop = 20;
        text.style.display = "block";
        text.textContent = " ";
        text.style.paddingBottom = 0;
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    registerNewUser(username, email, password, passwordVerification);
  }

  const handleFormChanges = (t, e) => {
    if(t === 'password'){
      setPassword(e);
      setPasswordVerification('');
    }
    else if(t === 'verify'){
      setPasswordVerification(e);
    }
    handleVerificationBox(e);
  }

    /*
    */

    // if (questionTitle.length > 100) {
    //   alert('The title must not exceed 100 characters.');
    //   return;
    // }
    // if (!questionTitle || !questionText || !username || !questionTags) {
    //   alert('Please fill in all required fields.');
    //   return;
    // }
    // if (tags.length > 5) {
    //   alert('You can only add up to 5 tags.');
    //   return;
    // }
    // for (let tag of tags) {

    //   if (tag.length > 20) {
    //       alert('Each tag or part of a hyphenated tag must not be longer than 20 characters.');
    //       return;
    //   }
    // }

    // try {
    //     await axios.post('http://localhost:8000/question', {
    //         title: questionTitle,
    //         text: questionText,
    //         tags: tags,
    //         asked_by: username
    //     });
    //     setQuestionTitle('');
    //     setQuestionText('');
    //     setQuestionTags('');
    //     setUsername('');
    //     showQuestionsFunc(); 
    // } catch (error) {
    //     console.error('Failed to post the question:', error);
    //     alert('Error posting question: ' + error.response?.data?.message || error.message);
    // }
  
  return (
    <div className="registerContentWrapper">
      <div className="registerBoxWrapper">
        <div className="registerForm">
          <form id="registerForm" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
              maxLength="256"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
              value={email} 
              maxLength="254"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              maxLength="256"
              value={password} 
              onChange={(e) => handleFormChanges('password', e.target.value)}
            />
            <label htmlFor="passwordVerification">Verify Password</label>
            <input
              type="password"
              id="passwordVerification"
              name="passwordVerification"
              placeholder="Enter password (must match above)"
              required
              maxLength="256"
              value={passwordVerification} 
              onChange={(e) => handleFormChanges('verify', e.target.value)}
            />
            <div id="passwordVerificationStatus"></div>
            <br />
            <div id="post-box">
              <button className="buttonStyleA" type="submit" id="registerUser">Register</button>
            </div>
          </form>
        </div>
      </div>
      <hr className="breakLine"></hr>
      <p className="hasAccountText">Already have an account?</p>
      <div className="change-box">
          <button className="buttonStyleB" onClick={()=>handleClick("login")} id="switchToLogin">Log in</button>
      </div>
      <hr className="breakLine"></hr>
      <div className="change-box">
          <button className="buttonStyleC" onClick={()=>handleClick("guest")} id="continueAsGuest">Continue as a Guest</button>
      </div>
    </div>
  );
}

export default UserRegisterForm;