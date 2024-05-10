const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db");
const answerRouter = require("./routes/answerRoutes");
const questionRouter = require("./routes/questionRoutes");
const tagRouter = require("./routes/tagRoutes");
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const port = 8000;
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
  };
  
connectDB();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/fake_so' }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));
app.use("/", questionRouter);
app.use("/", answerRouter);
app.use("/", tagRouter);
app.use('/', userRouter);
app.use('/', commentRouter);

app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    next();
});
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

const shutdown = async () => {
    console.log('\nServer is shutting down...');

    
    server.close(async () => {
        try {
            await mongoose.connection.close();
            console.log('Server closed. Database instance disconnected');
        } catch (error) {
            console.error('Error during database disconnection:', error);
        }
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);  
process.on('SIGTERM', shutdown); 
