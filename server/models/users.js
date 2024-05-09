// User Document Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reputation: { type: Number, default: 50},
    creation_date: { type: Date, default: Date.now },
    is_admin: { type: Boolean, default: false },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  });
  userSchema.virtual('url').get(function () {
    return `posts/users/${this._id}`;
  });

  module.exports = mongoose.model('User', userSchema);