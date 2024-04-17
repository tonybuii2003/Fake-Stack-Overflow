import React, { useState } from 'react';
import '../stylesheets/App.css';
import Banner from './Banner';
import SidebarNav from '../components/SideNavBar';


export default function FakeStackOverflow() {
  const [showQuestions, setShowQuestions] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('null');
  const [currentSearchTag, setCurrentSearchTag] = useState('null');
  const [showTags, setShowTags] = useState(false);
  const [onSubmitSearch, setOnSubmitSearch] = useState(false);
  return (
    <section>
      <Banner currentSearchQuery={currentSearchQuery} setCurrentSearchQuery={setCurrentSearchQuery} setShowSearchResults={setShowSearchResults} onSubmitSearch={onSubmitSearch} setOnSubmitSearch={setOnSubmitSearch} setCurrentSearchTag={setCurrentSearchTag}></Banner>
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
