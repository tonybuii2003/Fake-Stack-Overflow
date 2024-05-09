const Answer = require('../models/answers');
const Question = require('../models/questions');

async function getAnswers(req, res) {
    const questionId = req.params.id; 

    try {
        const question = await Question.findById(questionId).populate('answers');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question.answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createAnswer(req, res) {
    const answer = new Answer({
        text: req.body.text,
        ans_by: req.body.ans_by,
    });

    try {
        const newAnswer = await answer.save();
        const question = await Question.findById(req.params.id);
        question.answers.push(newAnswer._id);
        await question.save();
        res.status(201).json(newAnswer);
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAnswers, createAnswer };