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
const getTagsByOwner = async (req, res) => {
    console.log('getTagsByOwner');
    try {
        const owner = req.params.owner;
        console.log(owner);
        const tags = await Tag.find({ owner: owner });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function deleteTag(req, res) {
    try {
        const tag = await Tag.findById(req.params.tagId);

        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        await Tag.findByIdAndDelete(req.params.tagId);
        res.status(200).json({ message: 'The tag has been deleted' });
    } catch (error) {
        console.error('Error deleting the tag:', error);
        res.status(500).json({ message: error.message });
    }
}
async function updateTag(req, res) {
    try {
        const { name, owner } = req.body;
        const tag = await Tag.findById(req.params.tagId);
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        if (name) tag.name = name;
        const updatedTag = await tag.save();
        res.status(200).json(updatedTag);
    } catch (error) {
        console.error('Error updating the tag:', error);
        res.status(500).json({ message: error.message });
    }
}
async function checkTagUsages(req, res){
    try {
        const tagdata = req.params;
        console.log(tagdata);
        const tag = await Tag.findById(tagdata.tagId);
        if (!tag) {
            return res.status(200).json({ message: 'Not in use' });
        }
        else {
            const questions = await Question.find()
                                        .populate('tags', 'name')
                                        .populate('answers')
                                        .exec();
            if(!questions){
                console.error('Error updating the tag: questions undefined');
                res.status(500).json({ message: "questions not found" });
            }
            const matches = questions.filter(question => 
                question.tags.some(questionTag => questionTag.name === tag.name)
            );
            res.status(200).json(matches.length);
        }
    } 
    catch (error) {
        console.error('Error updating the tag:', error);
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
async function getTagById(req, res) {
    try {
        const tag = await Tag.findById(req.params.tagId);
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { getTags, getQuestionsByTag, getTagsByOwner, getTagById, deleteTag, updateTag, checkTagUsages};