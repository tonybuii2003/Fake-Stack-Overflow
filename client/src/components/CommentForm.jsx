import React, { useState } from 'react';
import axios from 'axios';
import '../stylesheets/Form.css';
export default function CommentForm({ answerId, setCommentPageInfo, user, fetchData }) {
    const [commentText, setCommentText] = useState("");

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (commentText.length > 140) {
            alert("Comment must not exceed 140 characters.");
            return;
        }
        try {
            console.log('User:', user);
            await axios.post(`http://localhost:8000/answer/${answerId}/comment`, {
                text: commentText,
                commented_by: user.username
            });
            setCommentText("");
            setCommentPageInfo(prev => ({
                ...prev,
                [answerId]: {
                    ...prev[answerId],
                    showNavigation: true, // Show the navigation buttons again
                    showCommentForm: false // Hide the comment form
                }
            }));
            fetchData();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form className="comment-form" onSubmit={handleAddComment}>
            <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Write a comment..."
            />
            <button type="submit">Add Comment</button>
        </form>
    )
}
