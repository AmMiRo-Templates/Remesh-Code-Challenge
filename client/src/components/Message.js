import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Thought from "./Thought";
import { getThoughtsForMessage, addThought } from "../store/state/stateActions";
import styled from "styled-components";

const MessageDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
    margin: 5px;
`;

const MessageForm = styled.form`
    margin: 5px;
`;

const MessageButton = styled.button`
    margin: 5px;
`;

const Message = ({ message }) => {
    const dispatch = useDispatch();

    const [hide, setHide] = useState(true);
    const [thoughtText, setThoughtText] = useState("");

    const thoughts = useSelector((state) => state.thoughts[message.id]);
    const currentUser = useSelector((state) => state.currentUser);

    const handleChanges = (e) => {
        setThoughtText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (thoughtText.length > 0) {
            dispatch(
                addThought({
                    user_id: currentUser.id,
                    message_id: message.id,
                    text: thoughtText,
                })
            );
        }
        setThoughtText("");
    };

    const handleHide = () => {
        setHide(!hide);
    };

    useEffect(() => {
        dispatch(getThoughtsForMessage(message.id));
    }, []);

    return (
        <MessageDiv>
            <p>{message.text}</p>
            <MessageButton onClick={handleHide}>
                {hide === true ? "Show More" : "Show Less"}
            </MessageButton>
            {hide === false ? (
                <div>
                    <MessageForm onSubmit={handleSubmit}>
                        <label htmlFor="text">enter new thought text:</label>
                        <input
                            id="text"
                            type="text"
                            placeholder=""
                            name="text"
                            value={thoughtText}
                            onChange={handleChanges}
                        />
                        <button type="submit">Submit</button>
                    </MessageForm>
                    {thoughts
                        ? thoughts.map((thought) => {
                              return (
                                  <Thought thought={thought} key={thought.id} />
                              );
                          })
                        : null}
                </div>
            ) : null}
        </MessageDiv>
    );
};

export default Message;
