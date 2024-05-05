const Comment = require('../models/comments');
const Answer = require('../models/answers');
async function createComment(req, res) {
    const { text, commented_by } = req.body;
    const { answerId } = req.params; 

    try {
        const newComment = new Comment({
            text,
            commented_by
        });
        await newComment.save();

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        answer.comments.push(newComment._id);
        await answer.save();

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getComments(req, res) {
    const { answerId } = req.params; 

    try {
        
        const answer = await Answer.findById(answerId).populate('comments');
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        res.status(200).json(answer.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function upVoteComment(req, res) {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.votes += 1;
        await comment.save();

        res.status(200).json({ message: "Upvoted successfully", votes: comment.votes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { createComment, getComments, upVoteComment };