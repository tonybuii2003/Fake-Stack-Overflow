// Tag Document Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true }
  });
  
  tagSchema.virtual('url').get(function () {
    return `posts/tag/${this._id}`;
  });

module.exports = mongoose.model('Tag', tagSchema);