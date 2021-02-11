import axios from "axios";

// get users actions
export const SEARCHING_USERS_START = "SEARCHING_USERS_START";
export const SEARCHING_USERS_SUCCESS = "SEARCHING_USERS_SUCCESS";
export const SEARCHING_USERS_FAILURE = "SEARCHING_USERS_FAILURE";
export const getUsers = () => async (dispatch) => {
    dispatch({ type: SEARCHING_USERS_START });

    try {
        const res = await axios.get("http://localhost:5000/api/users");
        // console.log("getUsers response", res.data);
        dispatch({ type: SEARCHING_USERS_SUCCESS, payload: res.data });
    } catch (err) {
        // console.log("getUsers error", err);
        dispatch({ type: SEARCHING_USERS_FAILURE, payload: err });
    }
};

// select user actions
export const SELECT_USER = "SELECT_USER";
export const selectUser = (user) => (dispatch) => {
    dispatch({ type: SELECT_USER, payload: user });
};

// add user actions
export const ADD_USER_START = "ADD_USER_START";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const addUser = (username) => async (dispatch) => {
    dispatch({ type: ADD_USER_START });

    try {
        const res = await axios.post("http://localhost:5000/api/users", {
            username: username,
        });

        // console.log("addUser response", res.data);

        dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
        selectUser(res.data);
    } catch (err) {
        // console.log("addUser error", err);
        dispatch({ type: ADD_USER_FAILURE });
    }
};

// get conversations actions
export const GETTING_CONVERSATIONS_START = "GETTING_CONVERSATIONS_START";
export const GETTING_CONVERSATIONS_SUCCESS = "GETTING_CONVERSATIONS_SUCCESS";
export const GETTING_CONVERSATIONS_FAILURE = "GETTING_CONVERSATIONS_FAILURE";
export const getConversations = () => async (dispatch) => {
    dispatch({ type: GETTING_CONVERSATIONS_START });

    try {
        const res = await axios.get("http://localhost:5000/api/conversations");

        // console.log("getConversations response", res.data);

        dispatch({ type: GETTING_CONVERSATIONS_SUCCESS, payload: res.data });
    } catch (err) {
        // console.log("getConversations error", err);
        dispatch({ type: GETTING_CONVERSATIONS_FAILURE, payload: err });
    }
};

// add conversation actions
export const ADD_CONVERSATION_START = "ADD_CONVERSATION_START";
export const ADD_CONVERSATION_SUCCESS = "ADD_CONVERSATION_SUCCESS";
export const ADD_CONVERSATION_FAILURE = "ADD_CONVERSATION_FAILURE";
export const addConversation = (conversation) => async (dispatch) => {
    dispatch({ type: ADD_CONVERSATION_START });

    try {
        const res = await axios.post(
            "http://localhost:5000/api/conversations",
            conversation
        );

        // console.log("addConversation response", res.data);

        dispatch({ type: ADD_CONVERSATION_SUCCESS, payload: res.data });
    } catch (err) {
        // console.log("addConversation error", err);
        dispatch({ type: ADD_CONVERSATION_FAILURE });
    }
};

// get messages for conversation actions
export const GETTING_MESSAGES_START = "GETTING_MESSAGES_START";
export const GETTING_MESSAGES_SUCCESS = "GETTING_MESSAGES_SUCCESS";
export const GETTING_MESSAGES_FAILURE = "GETTING_MESSAGES_FAILURE";
export const getMessagesForConversation = (conversationId) => async (
    dispatch
) => {
    dispatch({ type: GETTING_MESSAGES_START });

    try {
        const res = await axios.get(
            `http://localhost:5000/api/messages/${conversationId}/conversation`
        );

        console.log("getMessagesForConversation response", res.data);

        dispatch({ type: GETTING_MESSAGES_SUCCESS, payload: res.data });
    } catch (err) {
        console.log("getMessagesForConversation error", err);
        dispatch({ type: GETTING_MESSAGES_FAILURE, payload: err });
    }
};

// add message actions
export const ADD_MESSAGE_START = "ADD_MESSAGE_START";
export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";
export const ADD_MESSAGE_FAILURE = "ADD_MESSAGE_FAILURE";
export const addMessage = (message) => async (dispatch) => {
    dispatch({ type: ADD_MESSAGE_START });

    try {
        const res = await axios.post(
            "http://localhost:5000/api/messages",
            message
        );

        console.log("addMessage response", res.data);

        dispatch({ type: ADD_MESSAGE_SUCCESS, payload: res.data });
    } catch (err) {
        console.log("addMessage error", err);
        dispatch({ type: ADD_MESSAGE_FAILURE });
    }
};

// get thoughts for message actions
export const GETTING_THOUGHTS_START = "GETTING_THOUGHTS_START";
export const GETTING_THOUGHTS_SUCCESS = "GETTING_THOUGHTS_SUCCESS";
export const GETTING_THOUGHTS_FAILURE = "GETTING_THOUGHTS_FAILURE";
export const getThoughtsForMessage = (messageId) => async (dispatch) => {
    dispatch({ type: GETTING_THOUGHTS_START });

    try {
        const res = await axios.get(
            `http://localhost:5000/api/thoughts/${messageId}/message`
        );

        // console.log("getThoughtsForMessage response", res.data);

        dispatch({ type: GETTING_THOUGHTS_SUCCESS, payload: res.data });
    } catch (err) {
        // console.log("getThoughtsForMessage error", err);
        dispatch({ type: GETTING_THOUGHTS_FAILURE, payload: err });
    }
};

// add thought actions
export const ADD_THOUGHT_START = "ADD_THOUGHT_START";
export const ADD_THOUGHT_SUCCESS = "ADD_THOUGHT_SUCCESS";
export const ADD_THOUGHT_FAILURE = "ADD_THOUGHT_FAILURE";
export const addThought = (thought) => async (dispatch) => {
    dispatch({ type: ADD_THOUGHT_START });

    try {
        const res = await axios.post(
            "http://localhost:5000/api/thoughts",
            thought
        );

        // console.log("addThought response", res.data);

        dispatch({ type: ADD_THOUGHT_SUCCESS, payload: res.data });
    } catch (err) {
        // console.log("addThought error", err);
        dispatch({ type: ADD_THOUGHT_FAILURE });
    }
};
