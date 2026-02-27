import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { user_Context } from "../context/userContext";
import axios from 'axios';

const Form = () => {

    const { data, setData, updateData, setUpdateData } = useContext(user_Context);

    const getData = () => {
        axios.get("http://localhost:3000/api/users")
            .then((res) => {
                setData(res.data.allData);
            }).catch((error) => {
                console.log("Failed To Get Data", error);
            })
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === "" || email.trim() === "" || age.trim() === "" || image.trim() === "") return window.alert("Please Fill All Fileds")
        else {
            if (!!updateData) {
                axios.patch("http://localhost:3000/api/users/" + updateData.id, {
                    name: name,
                    email: email,
                    age: +age,
                    image: image
                })
                .then((res)=>{
                    getData();
                })
                setName("");
                setEmail("");
                setAge("");
                setImage("");
                setUpdateData(null);
            } else {
                const createData = () => {
                    axios.post("http://localhost:3000/api/users", {
                        name: name,
                        email: email,
                        age: +age,
                        image: image
                    })
                        .then((res) => {
                            getData();
                        })
                }
                createData();
                setName("");
                setEmail("");
                setAge("");
                setImage("");
            }
        }
    }

    useEffect(() => {
        if (!!updateData) {
            setName(updateData.name);
            setEmail(updateData.email);
            setAge(updateData.age);
            setImage(updateData.image);
        }
    }, [updateData]);

    return (
        <form onSubmit={(e) => {
            handleSubmit(e);
        }}>
            <input name="name" type="text" placeholder="Enter Name" value={name} onChange={(text) => {
                setName(text.target.value);
            }} />
            <input name="email" type="text" placeholder="Enter Email" value={email} onChange={(text) => {
                setEmail(text.target.value);
            }} />
            <input name="age" type="text" placeholder="Enter Age" value={age} onChange={(text) => {
                setAge(text.target.value);
            }} />
            <input name="image" type="text" placeholder="Enter Image URL" value={image} onChange={(text) => {
                setImage(text.target.value);
            }} />
            <button>
                <span className="span-1">
                    {updateData ? "Update Card" : "Create Card"}
                </span>
                <span className="span-2">
                    {updateData ? "Update Card" : "Create Card"}
                </span>
            </button>
        </form>
    )
}

export default Form;