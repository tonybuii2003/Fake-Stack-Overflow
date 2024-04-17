import React, { useState } from 'react';
import '../stylesheets/Form.css';
import axios from 'axios';
function QuestionForm({model, showQuestionsFunc}) {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questionTags, setQuestionTags] = useState('');
  const [username, setUsername] = useState('');
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

    addNewQuestion(questionTitle, questionText, questionTags, username);
    console.log({ questionTitle });
  }
  
  const addNewQuestion = async (questionTitle, questionText, questionTags, username) => {
    questionTitle = questionTitle.trim();
    questionText = questionText.trim();
    username = username.trim();
    questionTags = questionTags.trim();
    const tags = Array.from(new Set(questionTags.split(/\s+/).filter(Boolean).map(tag => tag.toLowerCase())));

    if (questionTitle.length > 100) {
      alert('The title must not exceed 100 characters.');
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
            text: questionText,
            tags: tags,
            asked_by: username
        });
        setQuestionTitle('');
        setQuestionText('');
        setQuestionTags('');
        setUsername('');
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
        <label htmlFor="username">Username*</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          placeholder="Username" 
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> <br />
        <div className="post-box">
          <button type="submit" id="postQuestion">Post Question</button>
          <span className="required-text">* indicates mandatory fields</span>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
