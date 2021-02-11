import React from "react";
import { useDispatch } from "react-redux";
import { selectUser } from "../store/state/stateActions";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();

    const handleSelect = (e) => {
        e.preventDefault();
        dispatch(selectUser(user));
    };

    return <div onClick={handleSelect}>{user.username}</div>;
};

export default UserCard;
