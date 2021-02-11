import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Conversation from "./Conversation";
import { getConversations, addConversation } from "../store/state/stateActions";

const ConversationsList = () => {
    const dispatch = useDispatch();

    const [convoTitle, setConvoTitle] = useState("");

    const conversations = useSelector((state) => state.conversations);
    const currentUser = useSelector((state) => state.currentUser);

    const handleChanges = (e) => {
        setConvoTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (convoTitle.length > 0) {
            dispatch(
                addConversation({ user_id: currentUser.id, title: convoTitle })
            );
        }
        setConvoTitle("");
    };

    useEffect(() => {
        dispatch(getConversations());
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">enter new conversation title:</label>
                <input
                    id="title"
                    type="text"
                    placeholder=""
                    name="title"
                    value={convoTitle}
                    onChange={handleChanges}
                />
                <button type="submit">Submit</button>
            </form>
            {conversations.map((conversation) => {
                return (
                    <Conversation
                        conversation={conversation}
                        key={conversation.id}
                    />
                );
            })}
        </div>
    );
};

export default ConversationsList;
