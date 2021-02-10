// imports/setup
const router = require("express").Router();
const Messages = require("../models/messagesModel");

// middleware to check if message with given id exists
const checkMessageId = async (req, res, next) => {
    let message;
    try {
        message = await Messages.findMessageById(req.params.id);
        if (!message) {
            res.status(404).json({
                message: "There was a problem locating this message.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Error locating this message: \n${error}`,
        });
    }

    res.message = message;
    next();
};

// get all messages for conversation
router.get("/:id/conversation", async (rec, res) => {
    try {
        const messages = await Messages.findAllMessagesForConversation(
            req.params.id
        );
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({
            message: "There was an error getting these messages.",
            error: err,
        });
    }
});

// get message by id
router.get("/:id", checkMessageId, async (req, res) => {
    res.status(200).json(res.message);
});

// create message
router.post("/", async (req, res) => {
    const messageInfo = {
        text: req.body.text,
        user_id: req.body.user_id,
        conversation_id: req.body.conversation_id,
        time: Date.now(),
    };

    // if text was sent with request, create message
    if (messageInfo.text !== "") {
        try {
            const newMessage = await Messages.createMessage(messageInfo);
            res.status(201).json(newMessage);
        } catch (err) {
            res.status(500).json({
                message: "There was a problem adding this message.",
                error: err,
            });
        }
        // if no text was included with request
    } else {
        res.status(400).json({
            message: "Please include text for this message",
        });
    }
});

// change message
router.put("/:id", checkMessageId, async (req, res) => {
    const messageInfo = {
        id: req.body.id,
        user_id: req.body.user_id,
        conversation_id: req.body.conversation_id,
        text: req.body.text,
        time: req.body.time,
    };

    try {
        const updatedMessage = await Messages.editMessage(
            messageInfo,
            req.params.id
        );
        res.status(200).json(updatedMessage);
    } catch (err) {
        res.status(500).json({
            message: "There was a problem updating this message",
            error: err,
        });
    }
});

// delete message
router.delete("/:id", checkMessageId, async (req, res) => {
    try {
        const deletedMessage = await Messages.removeMessage(req.params.id);
        res.status(200).json(deletedMessage);
    } catch (err) {
        res.status(500).json({
            message: "There was a problem removing this message",
            error: err,
        });
    }
});

module.exports = router;
