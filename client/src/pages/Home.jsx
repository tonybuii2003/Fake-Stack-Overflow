import React, { useState } from 'react';
import '../stylesheets/App.css';
import Banner from '../components/Banner';
import SidebarNav from '../components/SideNavBar';

export default function FakeStackOverflow() {
  const [showQuestions, setShowQuestions] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('null');
  const [currentSearchTag, setCurrentSearchTag] = useState('null');
  const [showTags, setShowTags] = useState(false);
  const [onSubmitSearch, setOnSubmitSearch] = useState(false);
  return (
    <section>
      <Banner setCurrentSearchQuery={setCurrentSearchQuery} setShowSearchResults={setShowSearchResults} onSubmitSearch={onSubmitSearch} setOnSubmitSearch={setOnSubmitSearch} setCurrentSearchTag={setCurrentSearchTag} showSearchBar={showSearchBar} setShowSearchBar={setShowSearchBar}></Banner>
          <SidebarNav 
            showQuestions={showQuestions} setShowQuestions={setShowQuestions} 
            showTags={showTags} setShowTags={setShowTags}
            showSearchResults={showSearchResults} setShowSearchResults={setShowSearchResults}
            currentSearchQuery={currentSearchQuery} setCurrentSearchQuery={setCurrentSearchQuery}
            currentSearchTag={currentSearchTag} setCurrentSearchTag={setCurrentSearchTag}
            onSubmitSearch={onSubmitSearch} setOnSubmitSearch={setOnSubmitSearch}/>
    </section>
  );
}
