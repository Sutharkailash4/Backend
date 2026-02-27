import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const user_Context = createContext(null);

const UserContext = (props) => {
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(null);

    return (
        <user_Context.Provider value={{ data, setData, updateData, setUpdateData }}>
            {props.children}
        </user_Context.Provider>
    )
}

export default UserContext;