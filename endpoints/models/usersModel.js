const db = require("../../database/db-config");

// get all users
const findAllUsers = () => {
    return db("users");
};

// get user by username
const findUserByUsername = (username) => {
    return db("users").where({ username }).first();
};

// create user
const createUser = async (user) => {
    const id = await db("users").insert(user);
    return db("users").where({ id }).first();
};

// change username
const editUsername = (user, id) => {
    return db("users").where("id", id).update(user);
};

// delete user
const removeUser = (id) => {
    return db("users").where("id", id).del();
};

module.exports = {
    findAllUsers,
    findUserByUsername,
    createUser,
    editUsername,
    removeUser,
};
