import React from "react";
import styled from "styled-components";

const ThoughtP = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
    margin: 5px;
`;

const Thought = ({ thought }) => {
    return <ThoughtP>{thought.text}</ThoughtP>;
};

export default Thought;
