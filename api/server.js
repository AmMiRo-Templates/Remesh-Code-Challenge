// config for .env variables
require("dotenv").config();

// setup
const express = require("express");
const server = express();

// import and use middleware
const helmet = require("helmet");
server.use(helmet);
server.use(express.json());

// assign routers
const initialRouter = require("../endpoints/routers/initialRouter");

// use Routers
server.use("/api/initial-route", initialRouter);

// catch-all endpoint
server.get("/", (req, res) => {
    res.status(200).json({ message: "API is running" });
});

module.exports = server;
