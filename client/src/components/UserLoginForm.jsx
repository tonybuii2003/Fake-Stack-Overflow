import React, { useState } from 'react';
import '../stylesheets/Form.css';
import '../stylesheets/UserLoginRegisterForms.css';
import axios from 'axios';
function UserLoginForm({switchSubpageFunc, setTryLogin, tryLogin}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const handleClickA = (buttonId) => {
    if(buttonId !== undefined){
      switch(buttonId){
        case "register":
            switchSubpageFunc("register");
            break;
        case "guest":
            switchSubpageFunc("guest");
            break;
        default:
            break;
      }
    }
  }
  
  const handleSubmit = async (e) => {
    console.log('username:', username, 'password:', password)
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { email: username, password: password });
      console.log('Login response:', response);
      setTryLogin(!tryLogin)
    } catch (error) {
      alert('Login Failed: Your email or password is incorrect');
      console.error('Login error:', error);
  }
}
  // const loginUser = async (username, password) => {

  // };
  
  return (
    <div className="loginContentWrapper">
      <div className="loginBoxWrapper">
        <img className="loginIconImage" src="/icons5.png" alt="" width="50" height="50"></img>
        <div className="loginForm">
          <form id="loginForm" onSubmit={handleSubmit}>
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
            <br />
            <div className="post-box">
              <button className="buttonStyleA" type="submit" id="loginUser">Log in</button>
            </div>
          </form>
        </div>
      </div>
      <hr className="breakLine"></hr>
      <p className="noAccountText">Don't have an account?</p>
      <div className="change-box">
          <button className="buttonStyleB" onClick={()=>handleClickA("register")} id="switchToRegister">Register</button>
      </div>
      <hr className="breakLine"></hr>
      <div className="change-box">
          <button className="buttonStyleC" onClick={()=>handleClickA("guest")} id="continueAsGuest">Continue as a Guest</button>
      </div>
    </div>
  );
}

export default UserLoginForm;