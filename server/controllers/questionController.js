const Question = require('../models/questions');
const Tag = require('../models/tags');

async function getQuestions(req, res) {
    try {
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

module.exports = { getQuestions, getQuestionByID, postQuestion, incrementQuestionView};