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

// MongoDB connection string
const dbUrl = 'mongodb://127.0.0.1:27017/fake_so';

// Import models
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

async function initializeData() {
  // Clear the database (if necessary)
  await User.deleteMany({});
  await Question.deleteMany({});
  await Answer.deleteMany({});
  await Comment.deleteMany({});
  await Tag.deleteMany({});

  // Create admin user
  const { adminUsername, adminPassword } = parseAdminCredentials(process.argv);
  if (!adminUsername || !adminPassword) {
    console.log('Admin username and password must be provided as arguments.');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const adminUser = new User({
    first_name: 'Admin',
    last_name: 'User',
    email: adminUsername, // Assuming the email field is used for login
    password: hashedPassword,
    reputation: 1000,
    creation_date: new Date(),
    is_admin: true,
  });

  await adminUser.save();
  console.log('Admin user created:', adminUser);

  // Add other initial data here if necessary

  process.exit(0); // Exit the script
}

function parseAdminCredentials(args) {
  if (args.length < 4) return {};

  const adminUsername = args[2];
  const adminPassword = args[3];
  return { adminUsername, adminPassword };
}
