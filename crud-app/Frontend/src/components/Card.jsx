import React from "react";
import axios from 'axios';git 
import { useEffect } from "react";
import { useContext } from "react";
import { user_Context } from "../context/userContext";

const Card = () => {

    const { data, setData } = useContext(user_Context);

    const getData = () => {
        axios.get("http://localhost:3000/api/users")
            .then((res) => {
                setData(res.data.allData);
            }).catch((error) => {
                console.log("Failed To Get Data", error);
            })
    }

    const deleteData = (id) => {
        axios.delete("http://localhost:3000/api/users/" + id)
            .then((res) => {
                getData();
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="card_main_box">
            {data.map((elem, idx) => {
                return (
                    <div key={idx} className="card">
                        <img src={elem.image} alt="image not found" />
                        <h2>{elem.name}</h2>
                        <h4>{elem.age}</h4>
                        <h3>{elem.email}</h3>
                        <div className="btns">
                            <button onClick={() => {
                                deleteData(elem._id);
                            }} className="remove">Remove</button>
                            <button onClick={() => {
                                updateData(elem._id);
                            }} className="update">Update</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Card;