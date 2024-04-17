const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db");
const answerRouter = require("./routes/answerRoutes");
const questionRouter = require("./routes/questionRoutes");
const tagRouter = require("./routes/tagRoutes");
const mongoose = require("mongoose");
const port = 8000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", answerRouter);
app.use("/", questionRouter);
app.use("/", tagRouter);

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
