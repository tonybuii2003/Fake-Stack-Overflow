// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import axios from 'axios';
axios.defaults.withCredentials = true;
// import FakeStackOverflow from './components/fakestackoverflow.js'

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, username: "Guest", isGuest: true});
  const [tryLogin, setTryLogin] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/loggedIn', { withCredentials: true });
        console.log('Login status:', response.data.isLoggedIn);
        if (response.data.isLoggedIn) {
          setUser({ isLoggedIn: true, username: response.data.user.email, isGuest: false});
          console.log('User is logged in:', response.data.user.email);
        }
      } catch (error) {
        setUser({ isLoggedIn: false, username: "Guest", isGuest: true});
        console.error('Failed to verify login status:', error);
      }
    };

    checkLoginStatus();
  }, [tryLogin]);
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={user.isLoggedIn ? <HomePage setTryLogin={setTryLogin} tryLogin={tryLogin} user={user} /> : <WelcomePage setTryLogin={setTryLogin} tryLogin={tryLogin} user={user}/>} />
        </Routes>
      </Router>
   
  );
}

export default App;
