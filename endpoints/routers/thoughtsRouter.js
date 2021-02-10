// imports/setup
const router = require("express").Router();
const Thoughts = require("../models/thoughtsModel");

// middleware to check if thought with given id exists
const checkThoughtId = async (req, res, next) => {
    let thought;
    try {
        thought = await Thoughts.findThoughtById(req.params.id);
        if (!thought) {
            res.status(404).json({
                message: "There was a problem locating this thought.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Error locating this thought: \n${error}`,
        });
    }

    res.thought = thought;
    next();
};

// get all thoughts for message
router.get("/:id/message", async (rec, res) => {
    try {
        const thoughts = await Thoughts.findAllThoughtsForMessage(
            req.params.id
        );
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json({
            message: "There was an error getting these thoughts.",
            error: err,
        });
    }
});

// get thought by id
router.get("/:id", checkThoughtId, async (req, res) => {
    res.status(200).json(res.thought);
});

// create thought
router.post("/", async (req, res) => {
    const thoughtInfo = {
        text: req.body.text,
        user_id: req.body.user_id,
        message_id: req.body.message_id,
        time: Date.now(),
    };

    // if text was sent with request, create thought
    if (thoughtInfo.text !== "") {
        try {
            const newThought = await Thoughts.createThought(thoughtInfo);
            res.status(201).json(newThought);
        } catch (err) {
            res.status(500).json({
                message: "There was a problem adding this thought.",
                error: err,
            });
        }
        // if no text was included with request
    } else {
        res.status(400).json({
            message: "Please include text for this thought",
        });
    }
});

// change thought
router.put("/:id", checkThoughtId, async (req, res) => {
    const thoughtInfo = {
        id: req.body.id,
        user_id: req.body.user_id,
        message_id: req.body.message_id,
        text: req.body.text,
        time: req.body.time,
    };

    try {
        const updatedThought = await Thoughts.editThought(
            thoughtInfo,
            req.params.id
        );
        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json({
            message: "There was a problem updating this thought",
            error: err,
        });
    }
});

// delete thought
router.delete("/:id", checkThoughtId, async (req, res) => {
    try {
        const deletedThought = await Thoughts.removeThought(req.params.id);
        res.status(200).json(deletedThought);
    } catch (err) {
        res.status(500).json({
            message: "There was a problem removing this thought",
            error: err,
        });
    }
});

module.exports = router;
