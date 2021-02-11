// imports/setup
const router = require("express").Router();
const Users = require("../models/usersModel");

// get all users
router.get("/", async (req, res) => {
    try {
        const users = await Users.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error getting all users",
        });
    }
});

// get user by username
router.get("/:username", async (req, res) => {
    let user;
    try {
        user = await Users.findUserByUsername(req.params.username);
        if (!user) {
            res.status(404).json({
                message: `Cannot find user: ${req.params.username}`,
            });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({
            message: `Error getting this user: \n${error}`,
        });
    }
});

// create user
router.post("/", async (req, res) => {
    const userInfo = {
        username: req.body.username,
        time: Date.now(),
    };

    if (userInfo.username !== "") {
        try {
            const newUser = await Users.createUser(userInfo);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({
                message: "There was a problem adding this user.",
            });
        }
    } else {
        res.status(400).json({ message: "Please include a valid username" });
    }
});

// change username

// delete user

// exports
module.exports = router;
