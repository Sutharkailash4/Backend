import React, { useEffect, useState } from "react";
import axios from 'axios'

const App = () => {

  const [data, setData] = useState([]);

  const getData = () => {
    axios.get("http://localhost:3000/api/users")
      .then((res) => {
        setData(res.data.userData);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {
        data.map((elem, index) => {
          return (
            <div key={index} className="box" >
              <h2>{elem.name}</h2>
              <h2>{elem.email}</h2>
              <h2>{elem.age}</h2>
              <h2>{elem.city}</h2>
            </div >
          )
        })
      }
    </>
  )
}

export default App;