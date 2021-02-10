const db = require("../../database/db-config");

// get all messages for conversation
const findAllMessagesForConversation = (id) => {
    return db("messages").where("conversation_id", id);
};

// get message by id
const findMessageById = (id) => {
    return db("messages").where({ id }).first();
};

// create message
const createMessage = async (message) => {
    const [id] = await db("messages").insert(message, "id");
    return findMessageById(id);
};

// change message
const editMessage = (message, id) => {
    return db("messages")
        .where("id", id)
        .update(message)
        .then(() => {
            return findMessageById(id);
        });
};

// delete message
const removeMessage = async (id) => {
    const message = await findMessageById(id);
    db("messages").where({ id }).del();
    return message;
};

module.exports = {
    findAllMessagesForConversation,
    findMessageById,
    createMessage,
    editMessage,
    removeMessage,
};
