/*
TODO:
Include a script called server/init.js in your repository that will be run to create initial data in your schema. 
This script will be run using Node before starting the server. 

The initial data must contain the user profile for admin, so the username and password for an admin user 
must be provided as the first argument to server/init.js. 
You must use these credentials to create a user profile for admin in the database.
*/
// init.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const dbUrl = 'mongodb://127.0.0.1:27017/fake_so';

const User = require('./models/users');
const Question = require('./models/questions');
const Answer = require('./models/answers');
const Comment = require('./models/comments');
const Tag = require('./models/tags');

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
  initializeData();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
function getRandomDate(start, end) {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const randomTime = startDate + Math.random() * (endDate - startDate);
  return new Date(randomTime).toISOString();
}
async function initializeData() {
  await User.deleteMany({});
  await Question.deleteMany({});
  await Answer.deleteMany({});
  await Comment.deleteMany({});
  await Tag.deleteMany({});

  const { adminUsername, adminPassword } = parseAdminCredentials(process.argv);
  if (!adminUsername || !adminPassword) {
    console.log('Admin username and password must be provided as arguments.');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const adminUser = new User({
    first_name: 'Admin',
    last_name: 'User',
    email: adminUsername,
    password: hashedPassword,
    reputation: 1000,
    creation_date: new Date(),
    is_admin: true,
  });

  await adminUser.save();
  console.log('Admin user created:', adminUser);
  await createSampleData();

  process.exit(0);
}

async function createSampleData() {
  const tags = ['javascript', 'nodejs', 'react', 'mongodb', 'express', 'css', 'html'];
  const tagDocuments = await Promise.all(tags.map(async (tagName) => {
    const tag = new Tag({ name: tagName });
    await tag.save();
    return tag;
  }));

  for (let i = 1; i <= 7; i++) {
    const selectedTagIds = getRandomNonEmptySubset(tagDocuments).map(tag => tag._id);

    const question = new Question({
      title: `How to handle task ${i} in Web Development?`,
      summary: `Looking for best practices to optimize task ${i}.`,
      text: `Detailed explanation on optimizing task ${i} would be helpful.`,
      tags: selectedTagIds,
      asked_by: 'Admin',
      ask_date_time: getRandomDate('2020-01-01', '2024-12-31'),
      views: Math.floor(Math.random() * 100) + 1,
      votes: Math.floor(Math.random() * 20) - 10
    });
    await question.save();

    for (let j = 1; j <= 7; j++) {
      const answer = new Answer({
        text: `Here's a method for task ${i}, option ${j}.`,
        ans_by: 'Admin',
        ans_date_time: getRandomDate('2020-01-01', '2024-12-31'),
        questionId: question._id,
        comments: []
      });

      for (let k = 1; k <= 4; k++) {
        const comment = new Comment({
          text: `Comment ${k} on method ${j} for task ${i}.`,
          commented_by: 'Admin',
          comment_date_time: getRandomDate('2020-01-01', '2024-12-31'),
          votes: Math.floor(Math.random() * 10) - 5
        });
        await comment.save();
        answer.comments.push(comment._id);
      }

      await answer.save();
      question.answers.push(answer._id);
    }

    await question.save();
  }
}
function getRandomNonEmptySubset(array) {
  let count = Math.floor(Math.random() * array.length) + 1;
  let shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
function parseAdminCredentials(args) {
  if (args.length < 4) return {};

  const adminUsername = args[2];
  const adminPassword = args[3];
  return { adminUsername, adminPassword };
}
