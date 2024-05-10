import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/Form.css';

function EditTagForm({ tagId, showProfileFunc, showTagEditFormFunc, user }) {
    const [tagName, setTagName] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTagDetails = async () => {
          try {
            console.log(`http://localhost:8000/tag/${tagId}`);
            const response = await axios.get(`http://localhost:8000/tag/${tagId}`);
            console.log('Tag details:', response.data);
            const { name, owner } = response.data;
            setTagName(name);
            setLoading(false);
          } catch (error) {
            console.error('Failed to fetch tag details:', error);
            alert('Error fetching tag details: ' + error.message);
          }
        };
        fetchTagDetails();
      }, [tagId]);

      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:8000/tag/${tagId}`, {
            name: tagName
          });
          showProfileFunc()
        } catch (error) {
          console.error('Failed to update the tag:', error);
          alert('Error updating tag: ' + error.response?.data?.message || error.message);
        }
      };
      const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this tag? This cannot be undone.')) {
          try {
            await axios.delete(`http://localhost:8000/tag/${tagId}`);
            showProfileFunc()
          } catch (error) {
            console.error('Failed to delete the tag:', error);
            alert('Error deleting tag: ' + error.message);
          }
        }
      };
      if (loading) return <p>Loading...</p>;
      return (
        <div className="editquestionForm">
          <form id="editQuestionForm" onSubmit={handleUpdate}>
            <label htmlFor="tagName">Tag Name*</label>
            <input
              type="text"
              id="tagName"
              name="tagName"
              required
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
            <div className="form-actions">
              <button type="submit" className="updateButton">Update Tag</button>
              <button type="button" className="deleteButton" onClick={handleDelete}>Delete Tag</button>
              <span className="required-text">* indicates mandatory fields</span>
            </div>
            <div style={{ height: '20px'}}></div>
          </form>
        </div>
      );

}
export default EditTagForm;