import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Card from "./components/Card";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Form />
      <Card />
      <Footer />
    </div>
  )
}

export default App;