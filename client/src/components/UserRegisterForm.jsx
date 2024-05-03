import React, { useState } from 'react';
import '../stylesheets/Form.css';
import '../stylesheets/UserLoginRegisterForms.css';
function UserRegisterForm({switchSubpageFunc}) {

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
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

  const registerUser = async (fullname, username, password, passwordVerify) => {
    let fullnameTrim = fullname.replace(/\s+/g, ' ');
    let names = fullnameTrim.split(' ');
    names = names.filter(name => name !== '' && name !== ' ');
    console.log(names);
    if(names.length <= 1 || names.length >= 3){
        alert('Full names only include a first name and a last name, and may not have any special characters.');
        return;
    }
    let firstname = names[0];
    let lastname = names[1];
    const nameRegex = /[\p{P}\p{S}\p{N}]/u;
    if(nameRegex.test(firstname) || nameRegex.test(lastname)){
        alert('Full names only include a first name and a last name, and may not have any special characters.');
        return;
    }
    let usernameTrim = username.trim();
    let passwordTrim = password.trim();
    let passwordVerifyTrim = passwordVerify.trim();
    if(passwordTrim !== passwordVerifyTrim){
        alert('Your passwords do not match!');
        return;
    }
    
    const usernameRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(usernameRegex.test(usernameTrim)){
        alert('Valid email');
    }
    else {
        alert('Invalid email');
    }
  };

  const handleVerificationBox = (e) => {
    setPasswordVerification(e);
    const text = document.getElementById("passwordVerificationStatus");
    if(e !== password){
        text.style.display = "block";
        text.style.color = "red";
        text.style.paddingBottom = 0;
        text.textContent = "Passwords do not match!";
        document.getElementById("post-box").style.paddingTop = 0;
    }
    else {
        text.style.display = "none";
        document.getElementById("post-box").style.paddingTop = 20;
    }
    console.log("Pass:", password);
    console.log("Verify:", passwordVerification);
  };
  
  const handleSubmit = (e) => {
    //alert('This feature is not done yet.');
    registerUser(fullname, username, password, passwordVerification);
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
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter first and last name"
              required
              maxLength="256"
              value={fullname} 
              onChange={(e) => setFullname(e.target.value)}
            />
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter email address"
              required
              value={username} 
              maxLength="254"
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => handleVerificationBox(e.target.value)}
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