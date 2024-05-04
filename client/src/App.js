// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomePage from './pages/Home';
import WelcomePage from './pages/WelcomePage';
import axios from 'axios';
axios.defaults.withCredentials = true;
// import FakeStackOverflow from './components/fakestackoverflow.js'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tryLogin, setTryLogin] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/loggedIn', { withCredentials: true });
        console.log('Login status:', response.data.isLoggedIn);
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Failed to verify login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [tryLogin]);
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomePage /> : <WelcomePage setTryLogin={setTryLogin} tryLogin={tryLogin}/>} />
        </Routes>
      </Router>
   
  );
}

export default App;
