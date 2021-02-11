import React from "react";
import SelectUser from "./components/SelectUser";
import ConversationsList from "./components/ConversationsList";
import { useSelector } from "react-redux";

function App() {
    const currentUser = useSelector((state) => state.currentUser);

    return (
        <div className="App">
            {!currentUser.username ? <SelectUser /> : <ConversationsList />}
        </div>
    );
}

export default App;
