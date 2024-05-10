import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/Form.css';

function EditQuestionForm({ questionId, showProfileFunc, showEditFormFunc , user }) {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [questionTags, setQuestionTags] = useState('');
    const [questionSummary, setQuestionSummary] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchQuestionDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/question/${questionId}`);
            console.log('Question details:', response.data);
            console.log('Tags:', response.data.tags);
            const { title, text, tags, summary } = response.data;
            setQuestionTitle(title);
            setQuestionText(text);
            const promises = tags.map(tagId =>
                axios.get(`http://localhost:8000/tag/${tagId}`)
            );
            const tagsResponses = await Promise.all(promises);
            const tagsNames = tagsResponses.map(response => response.data.name);
            setQuestionTags(tagsNames.join(' '));
            setQuestionSummary(summary);
            setLoading(false);
          } catch (error) {
            console.error('Failed to fetch question details:', error);
            alert('Error fetching question details: ' + error.message);
          }
        };
    
        fetchQuestionDetails();
      }, [questionId]);
      const handleUpdate = async (e) => {
        e.preventDefault();
        const tags = questionTags.split(/\s+/).filter(Boolean).map(tag => tag.toLowerCase());
    
        try {
          await axios.put(`http://localhost:8000/question/${questionId}`, {
            title: questionTitle,
            summary: questionSummary,
            text: questionText,
            tags
          });
          showProfileFunc()
        } catch (error) {
          console.error('Failed to update the question:', error);
          alert('Error updating question: ' + error.response?.data?.message || error.message);
        }
      };
      const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this question? This cannot be undone.')) {
          try {
            await axios.delete(`http://localhost:8000/question/${questionId}`);
            showProfileFunc()
          } catch (error) {
            console.error('Failed to delete the question:', error);
            alert('Error deleting question: ' + error.message);
          }
        }
      };
      if (loading) return <p>Loading...</p>;
      return (
        <div className="editquestionForm">
          <form id="editQuestionForm" onSubmit={handleUpdate}>
            <label htmlFor="questionTitle">Question Title*</label>
            <input
              type="text"
              id="questionTitle"
              name="questionTitle"
              required
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
            <label htmlFor="questionSummary">Question Summary*</label>
            <textarea
              id="questionSummary"
              name="questionSummary"
              required
              value={questionSummary}
              onChange={(e) => setQuestionSummary(e.target.value)}
            />
            <label htmlFor="questionText">Question Text*</label>
            <textarea
              id="questionText"
              name="questionText"
              required
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <label htmlFor="questionTags">Tags*</label>
            <input
              type="text"
              id="questionTags"
              name="questionTags"
              required
              value={questionTags}
              onChange={(e) => setQuestionTags(e.target.value)}
            />
            <div className="form-actions">
              <button type="submit" className="updateButton">Update Question</button>
              <button type="button" className="deleteButton" onClick={handleDelete}>Delete Question</button>
              <span className="required-text">* indicates mandatory fields</span>
            </div>
            <div style={{ height: '20px'}}></div>
          </form>
        </div>
      );

}
export default EditQuestionForm;