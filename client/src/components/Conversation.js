import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import {
    getMessagesForConversation,
    addMessage,
} from "../store/state/stateActions";
import styled from "styled-components";

const ConvoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
    margin: 5px;
`;
const ConvoForm = styled.form`
    margin: 5px;
`;

const ConvoButton = styled.button`
    margin: 5px;
`;

const Conversation = ({ conversation }) => {
    const dispatch = useDispatch();

    const [hide, setHide] = useState(true);
    const [messageText, setMessageText] = useState("");

    const messages = useSelector((state) => state.messages[conversation.id]);
    const currentUser = useSelector((state) => state.currentUser);

    const handleChanges = (e) => {
        setMessageText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageText.length > 0) {
            dispatch(
                addMessage({
                    user_id: currentUser.id,
                    conversation_id: conversation.id,
                    text: messageText,
                })
            );
        }
        setMessageText("");
    };

    const handleHide = () => {
        setHide(!hide);
    };

    useEffect(() => {
        dispatch(getMessagesForConversation(conversation.id));
    }, []);

    return (
        <ConvoDiv>
            <p>{conversation.title}</p>
            <ConvoButton onClick={handleHide}>
                {hide === true ? "Show More" : "Show Less"}
            </ConvoButton>
            {hide === false ? (
                <div>
                    <ConvoForm onSubmit={handleSubmit}>
                        <label htmlFor="text">enter new message text:</label>
                        <input
                            id="text"
                            type="text"
                            placeholder=""
                            name="text"
                            value={messageText}
                            onChange={handleChanges}
                        />
                        <button type="submit">Submit</button>
                    </ConvoForm>
                    {messages
                        ? messages.map((message) => {
                              return (
                                  <Message message={message} key={message.id} />
                              );
                          })
                        : null}
                </div>
            ) : null}
        </ConvoDiv>
    );
};

export default Conversation;
