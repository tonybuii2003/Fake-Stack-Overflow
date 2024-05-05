import React from "react";
import '../stylesheets/Banner.css';
import '../stylesheets/SearchBar.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
function Banner({setCurrentSearchQuery, setShowSearchResults, onSubmitSearch, setOnSubmitSearch, setCurrentSearchTag, showSearchBar, setShowSearchBar, isLoggedInOrGuest, setTryLogin, tryLogin, user }){
    const navigate = useNavigate();
    const onSearch = (event) => {
        event.preventDefault();
        setCurrentSearchQuery(event.target.elements.searchBarInput.value);
        setShowSearchResults(true);
        setCurrentSearchTag('null');
        setOnSubmitSearch(!onSubmitSearch);
    };
    const handleLogout = async () => {
        try{
            console.log("Logging out...");
            const response = await axios.post('http://localhost:8000/logout');
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
        <section>
            <hr className="bannerTopBorder"></hr>
            <div className="banner">
                <div className="title">Fake Stack Overflow</div>
                {user.isLoggedIn && (
                    <button onClick={handleLogout} className="logoutButton">Logout</button>
                )}
                {showSearchBar && (
                    <div className="bannerSearchBar">
                    <form className="searchform" id="searchBar" onSubmit={onSearch}>
                        <input className="searchText" type="text" id="searchBarInput" placeholder="Search..."></input>
                    </form>
                </div>
                )}
                
            </div>
            <hr className="bannerBottomBorder"></hr>
        </section>
    );
}

export default Banner;