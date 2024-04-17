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
  
  const handleSubmit = (e) => {
    alert('This feature is not done yet.');
  }
  
//   const registerUser = async (username, password) => {

//   };
  
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
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
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
              value={passwordVerification} 
              onChange={(e) => setPasswordVerification(e.target.value)}
            />
            <br />
            <div className="post-box">
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