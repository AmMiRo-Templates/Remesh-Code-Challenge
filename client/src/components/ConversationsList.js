import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Conversation from "./Conversation";
import { getConversations, addConversation } from "../store/state/stateActions";

const ConversationsList = () => {
    const dispatch = useDispatch();

    const [convoTitle, setConvoTitle] = useState("");
    const [search, setSearch] = useState("");

    const conversations = useSelector((state) => state.conversations);
    const currentUser = useSelector((state) => state.currentUser);

    const handleChanges = (e) => {
        setConvoTitle(e.target.value);
    };

    const handleSearchChanges = (e) => {
        setSearch(e.target.value);
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
            <form>
                <label htmlFor="search">search conversations by title:</label>
                <input
                    id="search"
                    type="text"
                    placeholder=""
                    name="search"
                    value={search}
                    onChange={handleSearchChanges}
                />
            </form>
            {conversations.map((conversation) => {
                if (
                    conversation.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    search === ""
                ) {
                    return (
                        <Conversation
                            conversation={conversation}
                            key={conversation.id}
                        />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default ConversationsList;
