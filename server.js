// config for .env variables
require("dotenv").config();

// setup
const express = require("express");
const server = express();

// import and use middleware
const helmet = require("helmet");
server.use(helmet());
const cors = require("cors");
server.use(cors());
server.use(express.json());

// assign routers
const conversationRouter = require("./endpoints/routers/conversationsRouter");
const messageRouter = require("./endpoints/routers/messagesRouter");
const thoughtRouter = require("./endpoints/routers/thoughtsRouter");
const userRouter = require("./endpoints/routers/usersRouter");

// use Routers
server.use("/api/conversations", conversationRouter);
server.use("/api/messages", messageRouter);
server.use("/api/thoughts", thoughtRouter);
server.use("/api/users", userRouter);

// catch-all endpoint
server.get("/", (req, res) => {
    res.status(200).json({ message: "API is running" });
});

module.exports = server;
