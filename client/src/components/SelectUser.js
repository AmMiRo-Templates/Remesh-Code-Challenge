import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, addUser } from "../store/state/stateActions";
import UserCard from "./UserCard";

const SelectUser = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");

    const users = useSelector((state) => state.users);

    const handleChanges = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length > 0) {
            dispatch(addUser(username));
        }
        setUsername("");
    };

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <div>
            <h1>Select User</h1>
            <div>
                {users.map((user) => {
                    return <UserCard user={user} key={user.id} />;
                })}
            </div>

            <h2>If your username isn't listed above, create a new username.</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">enter new username:</label>
                <input
                    id="username"
                    type="text"
                    placeholder=""
                    name="username"
                    value={username}
                    onChange={handleChanges}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SelectUser;
