// imports/setup
const router = require("express").Router();
const Conversations = require("../models/conversationsModel");

// middleware to check if conversation with given id exists
const checkConversationId = async (req, res, next) => {
    let conversation;
    try {
        conversation = await Conversations.findConversationById(req.params.id);
        if (!conversation) {
            res.status(404).json({
                message: "There was a problem locating this conversation.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error locating this conversation",
        });
    }

    res.conversation = conversation;
    next();
};

// get all conversations
router.get("/", async (req, res) => {
    try {
        const conversations = await Conversations.findAllCoversations();
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({
            message: "Error getting all conversations",
        });
    }
});

// get conversation by id
router.get("/:id", checkConversationId, async (req, res) => {
    res.status(200).json(res.conversation);
});

// create conversation
router.post("/", async (req, res) => {
    const conversationInfo = {
        title: req.body.title,
        user_id: req.body.user_id,
        time: Date.now(),
    };

    // if title was sent with request, create conversation
    if (conversationInfo.title !== "") {
        try {
            const newConversation = await Conversations.createConversation(
                conversationInfo
            );
            res.status(201).json(newConversation);
        } catch (err) {
            res.status(500).json({
                message: "There was a problem adding this conversation.",
            });
        }
        // if no title was included with request
    } else {
        res.status(400).json({
            message: "Please include a title for this conversation",
        });
    }
});

// change conversation
router.put("/:id", checkConversationId, async (req, res) => {
    const conversationInfo = {
        id: req.body.id,
        user_id: req.body.user_id,
        title: req.body.title,
        time: req.body.time,
    };

    try {
        const updatedConversation = await Conversations.editConversation(
            conversationInfo,
            req.params.id
        );
        res.status(200).json(updatedConversation);
    } catch (err) {
        res.status(500).json({
            message: "There was a problem updating this conversation",
            error: err,
        });
    }
});

// delete conversation
router.delete("/:id", checkConversationId, async (req, res) => {
    try {
        const deletedConversation = await Conversations.removeConversation(
            req.params.id
        );
        res.status(200).json(deletedConversation);
    } catch (err) {
        res.status(500).json({
            message: "There was a problem removing this Conversation",
            error: err,
        });
    }
});

// exports
module.exports = router;
