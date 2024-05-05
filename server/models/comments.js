const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true, maxlength: 140 },
    commented_by: { type: String, required: true },
    comment_date_time: { type: Date, default: Date.now },
    votes: { type: Number, default: 0 }
});
commentSchema.virtual('url').get(function () {
    return `posts/comment/${this._id}`;
  });
module.exports = mongoose.model('Comment', commentSchema);
