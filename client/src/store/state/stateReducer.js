import {
    SEARCHING_USERS_START,
    SEARCHING_USERS_SUCCESS,
    SEARCHING_USERS_FAILURE,
    SELECT_USER,
    ADD_USER_START,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    GETTING_CONVERSATIONS_START,
    GETTING_CONVERSATIONS_SUCCESS,
    GETTING_CONVERSATIONS_FAILURE,
    ADD_CONVERSATION_START,
    ADD_CONVERSATION_SUCCESS,
    ADD_CONVERSATION_FAILURE,
    GETTING_MESSAGES_START,
    GETTING_MESSAGES_SUCCESS,
    GETTING_MESSAGES_FAILURE,
    ADD_MESSAGE_START,
    ADD_MESSAGE_SUCCESS,
    ADD_MESSAGE_FAILURE,
    GETTING_THOUGHTS_START,
    GETTING_THOUGHTS_SUCCESS,
    GETTING_THOUGHTS_FAILURE,
    ADD_THOUGHT_START,
    ADD_THOUGHT_SUCCESS,
    ADD_THOUGHT_FAILURE,
} from "./stateActions";

const initialState = {
    users: [],
    currentUser: {},
    conversations: [],
    messages: {},
    thoughts: {},
    isLoading: false,
};

export const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        // searching users
        case SEARCHING_USERS_START:
            return {
                ...state,
                isLoading: true,
            };
        case SEARCHING_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: [...action.payload],
            };
        case SEARCHING_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        // select user
        case SELECT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };

        // add user
        case ADD_USER_START:
            return {
                ...state,
                isLoading: true,
            };
        case ADD_USER_SUCCESS:
            const updatedUsers = [...state.users, action.payload];
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                users: [...updatedUsers],
            };
        case ADD_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        // get conversations
        case GETTING_CONVERSATIONS_START:
            return {
                ...state,
                isLoading: true,
            };
        case GETTING_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                conversations: [...action.payload],
            };
        case GETTING_CONVERSATIONS_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        // add conversation
        case ADD_CONVERSATION_START:
            return {
                ...state,
                isLoading: true,
            };
        case ADD_CONVERSATION_SUCCESS:
            const updatedConversations = [
                ...state.conversations,
                action.payload,
            ];
            return {
                ...state,
                isLoading: false,
                conversations: updatedConversations,
            };
        case ADD_CONVERSATION_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        // get messages for conversation
        case GETTING_MESSAGES_START:
            return {
                ...state,
                isLoading: true,
            };
        case GETTING_MESSAGES_SUCCESS:
            const messages = action.payload;
            const conversationId = action.payload[0].conversation_id;
            const updatedMessages = {
                ...state.messages,
            };
            updatedMessages[conversationId] = messages;
            return {
                ...state,
                isLoading: false,
                messages: { ...updatedMessages },
            };
        case GETTING_MESSAGES_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        // add message
        case ADD_MESSAGE_START:
            return {
                ...state,
                isLoading: true,
            };
        case ADD_MESSAGE_SUCCESS:
            const newMessages = {
                ...state.messages,
            };
            const conversationsId = action.payload.conversation_id;
            newMessages[conversationsId] = [
                ...state.messages[conversationsId],
                action.payload,
            ];
            return {
                ...state,
                isLoading: false,
                messages: {
                    ...newMessages,
                },
            };
        case ADD_MESSAGE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        // get thoughts for message
        case GETTING_THOUGHTS_START:
            return {
                ...state,
                isLoading: true,
            };
        case GETTING_THOUGHTS_SUCCESS:
            const thoughts = action.payload;
            const messageId = thoughts[0].message_id;
            const updatedThoughts = {
                ...state.thoughts,
            };
            updatedThoughts[messageId] = thoughts;
            return {
                ...state,
                isLoading: false,
                thoughts: { ...updatedThoughts },
            };
        case GETTING_THOUGHTS_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        // add thought
        case ADD_THOUGHT_START:
            return {
                ...state,
                isLoading: true,
            };
        case ADD_THOUGHT_SUCCESS:
            const newThoughts = {
                ...state.thoughts,
            };
            const messagesId = action.payload.message_id;
            newThoughts[messagesId] = [
                ...state.thoughts[messagesId],
                action.payload,
            ];
            return {
                ...state,
                isLoading: false,
                thoughts: { ...newThoughts },
            };
        case ADD_THOUGHT_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        // default
        default:
            return state;
    }
};
