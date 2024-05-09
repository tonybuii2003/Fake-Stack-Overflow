const Question = require('../models/questions');
const Tag = require('../models/tags');
const Answer = require('../models/answers');
const Comment = require('../models/comments');
const User = require('../models/users');

async function getQuestions(req, res) {
    try {
        console.log('Request Body:', req.body);
        const questions = await Question.find()
                                        .populate('tags', 'name')
                                        .populate('answers')
                                        .exec();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getQuestionByID(req, res) {
    try {
        console.log('Request Body:', req.body);
        const question = await Question.findById(req.params.id);
        
        if (!question) {
            return res.status(404).json({ message: 'Question not found' }); 
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function postQuestion(req, res) {
    const { title, summary, text, tags, asked_by } = req.body;
    
    try {
        const tagIds = await Promise.all(tags.map(async (tagName) => {
            let tag = await Tag.findOne({ name: tagName });
            if (!tag) {
                tag = new Tag({ name: tagName });

                await tag.save();
            }
            return tag._id;
        }));

        const question = new Question({
            title,
            summary,
            text,
            tags: tagIds,
            asked_by
        });

        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Error creating question or tags:', error);
        res.status(500).json({ message: error.message });
    }
}
async function incrementQuestionView(req, res) {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        question.views += 1;
        await question.save();

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error('Error incrementing question view:', error);
    }
}
const getQuestionsByUsername = async (req, res) => {
    console.log('getQuestionsByUsername');
    try {
        const username = req.params.username;
        const questions = await Question.find({ asked_by: username })
            .populate('tags')
            .populate('answers');
        

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function deleteQuestion(req, res) {
    try {
        const question = await Question.findById(req.params.id).populate('answers');

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        for (const answer of question.answers) {
            await Comment.deleteMany({ _id: { $in: answer.comments }});
            await Answer.findByIdAndDelete(answer._id);
        }

        await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Question and all related answers and comments have been deleted' });
    } catch (error) {
        console.error('Error deleting the question:', error);
        res.status(500).json({ message: error.message });
    }
}
async function updateQuestion(req, res) {
    try {
        console.log('Request Body:', req.body);
        const { title, summary, text, tags } = req.body;
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        if (title) question.title = title;
        if (summary) question.summary = summary;
        if (text) question.text = text;
        if (tags) {
            const tagIds = await Promise.all(tags.map(async (tagName) => {
                let tag = await Tag.findOne({ name: tagName });
                if (!tag) {
                    tag = new Tag({ name: tagName });
                    await tag.save();
                }
                return tag._id;
            }));
            question.tags = tagIds;
        }
        const updatedQuestion = await question.save();
        res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error('Error updating the question:', error);
        res.status(500).json({ message: error.message });
    }
}
async function upVoteQuestion(req, res) {
    const questionId = req.params.id;
    const voterId = req.user.userId; 
    console.log('Voter ID:', voterId);

    try {
        const voter = await User.findById(voterId);
        console.log('Voter:', voter);
        if (!voter || voter.reputation < 50) {
            return res.status(403).json({ message: "Insufficient reputation to vote." });
        }

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found." });
        }

        // Update question votes
        question.votes = (question.votes || 0) + 1;
        await question.save();

        // Update user reputation
        const questionOwner = await User.findOne({ email: question.asked_by });
        if (questionOwner) {
            questionOwner.reputation += 5;
            await questionOwner.save();
        }

        res.status(200).json({ message: "Vote added successfully." });
    } catch (error) {
        console.error('Voting error:', error);
        res.status(500).json({ message: "Error processing vote." });
    }
}
async function downVoteQuestion(req, res) {
    const questionId = req.params.id;
    const voterId = req.user.userId;

    try {
        const voter = await User.findById(voterId);
        if (!voter || voter.reputation < 50) {
            return res.status(403).json({ message: "Insufficient reputation to vote." });
        }

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found." });
        }

        // Update question votes
        question.votes = (question.votes || 0) - 1;
        await question.save();

        // Update user reputation
        const questionOwner = await  User.findOne({ email: question.asked_by });
        if (questionOwner) {
            questionOwner.reputation -= 10;
            await questionOwner.save();
        }

        res.status(200).json({ message: "Vote subtracted successfully." });
    } catch (error) {
        console.error('Voting error:', error);
        res.status(500).json({ message: "Error processing vote." });
    }
}
module.exports = { getQuestions, getQuestionByID, postQuestion, incrementQuestionView, getQuestionsByUsername, deleteQuestion, updateQuestion, upVoteQuestion, downVoteQuestion};