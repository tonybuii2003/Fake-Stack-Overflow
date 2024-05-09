import React, { useState, useEffect } from 'react';
import '../stylesheets/Form.css';
import axios from 'axios';
function QuestionForm({showQuestionsFunc, user}) {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questionTags, setQuestionTags] = useState('');
  const [questionSummary, setQuestionSummary] = useState('');
  const [allTags, setTags] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tag');
        setTags(response.data.map(tag => tag.name.toLowerCase()));
        const userData = await axios.get(`http://localhost:8000/user/${user.userId}`);
        setUserData(userData.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchData();
  }, []);
 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const hyperlinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const invalidHyperlinkRegex = /\[([^\]]*)\]\((?!https?:\/\/[^\s)]+).*?\)/g;

    if (invalidHyperlinkRegex.test(questionText)) {
      alert('The hyperlink must begin with "https://" or "http://".');
      return;
    }

    if (questionText.indexOf('](') !== -1 && !hyperlinkRegex.test(questionText)) {
      alert('There is an incorrectly formatted hyperlink in your text.');
      return;
    }
    
    addNewQuestion(questionTitle, questionText, questionTags, user.username, questionSummary);
    console.log({ questionTitle });
  }
  
  const addNewQuestion = async (questionTitle, questionText, questionTags, username, questionSummary) => {
    
    questionTitle = questionTitle.trim();
    questionText = questionText.trim();
    username = username.trim();
    questionTags = questionTags.trim();
    questionSummary = questionSummary.trim();
    
    const tags = Array.from(new Set(questionTags.split(/\s+/).filter(Boolean).map(tag => tag.toLowerCase())));
    const newTags = tags.filter(tag => !allTags.includes(tag));
    console.log("currnet user data and tag", userData.reputation, newTags, allTags)
    if (newTags.length > 0 && userData.reputation < 50) {
      alert('You must have at least 50 reputation points to create new tags.');
      return;
    }
    if (questionTitle.length > 50) {
      alert('The title must not exceed 50 characters.');
      return;
    }
    if (questionSummary.length > 140) {
      alert('The summary must not exceed 140 characters.');
      return;
    }
    if (!questionTitle || !questionText || !username || !questionTags) {
      alert('Please fill in all required fields.');
      return;
    }
    if (tags.length > 5) {
      alert('You can only add up to 5 tags.');
      return;
    }
    for (let tag of tags) {

      if (tag.length > 20) {
          alert('Each tag or part of a hyphenated tag must not be longer than 20 characters.');
          return;
      }
    }

    try {
        await axios.post('http://localhost:8000/question', {
            title: questionTitle,
            summary: questionSummary,
            text: questionText,
            tags: tags,
            asked_by: username
        });
        setQuestionTitle('');
        setQuestionText('');
        setQuestionTags('');
        setQuestionSummary('');
        showQuestionsFunc(); 
    } catch (error) {
        console.error('Failed to post the question:', error);
        alert('Error posting question: ' + error.response?.data?.message || error.message);
    }
  };
  
  return (
    <div className="questionForm"> 
      <form id="newQuestionForm" onSubmit={handleSubmit}>
        <label htmlFor="questionTitle">Question Title*</label>
        <input
          type="text"
          id="questionTitle"
          name="questionTitle"
          placeholder="Limit title to 100 characters or less"
          required
          value={questionTitle} 
          onChange={(e) => setQuestionTitle(e.target.value)}
        />
        <label htmlFor="questionSummary">Question Summary*</label>
        <textarea
          id="questionSummary"
          name="questionSummary"
          placeholder="Summarize your question"
          required
          value={questionSummary}
          onChange={(e) => setQuestionSummary(e.target.value)}
        ></textarea>
        <label htmlFor="questionText">Question Text*</label>
        <textarea 
          id="questionText" 
          name="questionText" 
          placeholder="Add details" 
          required 
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        ></textarea>
        <label htmlFor="questionTags">Tags*</label>
        <input 
          type="text" 
          id="questionTags" 
          name="questionTags" 
          placeholder="Add keywords separated by whitespace" 
          required
          value = {questionTags}
          onChange={(e) => setQuestionTags(e.target.value)}
        />
        <div className="post-box">
          <button type="submit" id="postQuestion">Post Question</button>
          <span className="required-text">* indicates mandatory fields</span>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
