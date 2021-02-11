const db = require("../../database/db-config");

// get all thoughts for message
const findAllThoughtsForMessage = (id) => {
    return db("thoughts").where("message_id", id);
};

// get thought by id
const findThoughtById = (id) => {
    return db("thoughts").where({ id }).first();
};

// create thought
const createThought = async (thought) => {
    const id = await db("thoughts").insert(thought);
    return db("thoughts").where({ id }).first();
};

// change thought
const editThought = (thought, id) => {
    return db("thoughts")
        .where("id", id)
        .update(thought)
        .then(() => {
            return findThoughtById(id);
        });
};

// delete thought
const removeThought = async (id) => {
    const thought = await findThoughtById(id);
    db("thoughts").where({ id }).del();
    return thought;
};

module.exports = {
    findAllThoughtsForMessage,
    findThoughtById,
    createThought,
    editThought,
    removeThought,
};
