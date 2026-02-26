import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import UserContext from "./context/userContext.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <UserContext>
    <App />
  </UserContext>
)