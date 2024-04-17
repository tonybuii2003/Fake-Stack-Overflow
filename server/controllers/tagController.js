const Question = require('../models/questions');
const Tag = require('../models/tags');

async function getTags(req, res) {
    try {
        const tags = await Tag.find()
                                        .populate('name')
                                        .exec();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getQuestionsByTag(req, res) {
    try {
        const questions = await Question.findById(req.params.id);
        
        if (!questions) {
            return res.status(404).json({ message: 'Questions not found' }); 
        }
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// async function getQuestionsByTag(req, res) {
//     try {
//         const questions = await Question.find()
//         .populate('tags', 'name')
//         .populate('answers')
//         .exec();
        
//         const filteredQuestions = questions.filter(question =>
//             question.tags.some(tag => tids.includes(tag._id))
//         );
//         res.status(200).json(filteredQuestions);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
module.exports = { getTags, getQuestionsByTag};