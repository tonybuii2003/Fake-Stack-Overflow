import React from "react";
import '../stylesheets/Banner.css';
import '../stylesheets/SearchBar.css';
import axios from "axios";

axios.defaults.withCredentials = true;
function Banner({setCurrentSearchQuery, setShowSearchResults, onSubmitSearch, setOnSubmitSearch, setCurrentSearchTag, showSearchBar, setShowSearchBar }){
    
    const onSearch = (event) => {
        event.preventDefault();
        setCurrentSearchQuery(event.target.elements.searchBarInput.value);
        setShowSearchResults(true);
        setCurrentSearchTag('null');
        setOnSubmitSearch(!onSubmitSearch);
    };
    
    return (
        <section>
            <hr className="bannerTopBorder"></hr>
            <div className="banner">
                <div className="title">Fake Stack Overflow</div>
                
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