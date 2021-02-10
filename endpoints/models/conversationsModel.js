const db = require("../../database/db-config");

// get all conversations
const findAllCoversations = () => {
    return db("conversations");
};

// get conversation by id
const findConversationById = (id) => {
    return db("conversations").where({ id }).first();
};

// create conversation
const createConversation = async (conversation) => {
    const [id] = await db("conversations").insert(conversation, "id");
    return findConversationById(id);
};

// change conversation
const editConversation = (conversation, id) => {
    return db("conversations")
        .where("id", id)
        .update(conversation)
        .then(() => {
            return findConversationById(id);
        });
};

// delete conversation
const removeConversation = async (id) => {
    const conversation = await findConversationById(id);
    db("conversations").where({ id }).del();
    return conversation;
};

module.exports = {
    findAllCoversations,
    findConversationById,
    createConversation,
    editConversation,
    removeConversation,
};
