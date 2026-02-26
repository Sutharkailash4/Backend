import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const user_Context = createContext(null);

const UserContext = (props) => {
    const [data, setData] = useState([]);

    return (
        <user_Context.Provider value={{ data, setData }}>
            {props.children}
        </user_Context.Provider>
    )
}

export default UserContext;