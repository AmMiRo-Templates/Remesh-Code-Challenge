import React from "react";
import styled from "styled-components";

const ThoughtDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
    margin: 5px;
`;

const Thought = ({ thought }) => {
    const time = new Date(thought.time).toString();

    return (
        <ThoughtDiv>
            <p>{thought.text}</p>
            <p>{time}</p>
        </ThoughtDiv>
    );
};

export default Thought;
