import React, { useState } from 'react';
import '../stylesheets/App.css';
import UserLoginForm from '../components/UserLoginForm';
import UserRegisterForm from '../components/UserRegisterForm';
import BannerStatic from '../components/BannerStatic';
import HomePage from './HomePage';

export default function WelcomePage({setTryLogin, tryLogin, user, isLoggedIn}) {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showGuest, setShowGuest] = useState(false);

  if(showLogin){
    document.title = "Log in - FakeStackOverflow";
  }
  else if(showRegister) {
    document.title = "Register - FakeStackOverflow";
  }
  else {
    document.title = "FakeStackOverflow - Where CSE316 Students Browse, Squint, & Cry Tears";
  }

  function switchSubpageFunc(page) {
    if(page === "login"){
      setShowLogin(true);
      setShowRegister(false);
      setShowGuest(false);
    }
    else if(page === "register") {
      setShowLogin(false);
      setShowRegister(true);
      setShowGuest(false);
    }
    else if(page === "guest") {
      setShowLogin(false);
      setShowRegister(false);
      setShowGuest(true);
    }
  };

  return (
    <section>
      {!showGuest && <BannerStatic></BannerStatic>}
      <section>
        {showLogin && 
        <UserLoginForm
          switchSubpageFunc = {switchSubpageFunc}
          setTryLogin={setTryLogin}
          tryLogin={tryLogin}
          ></UserLoginForm>}
        {showRegister && <UserRegisterForm
        switchSubpageFunc = {switchSubpageFunc}
        ></UserRegisterForm>}
        {showGuest && <HomePage
        setTryLogin={setTryLogin}
        tryLogin={tryLogin}
        user={user}/>
        }
      </section>
    </section>
  );
}
