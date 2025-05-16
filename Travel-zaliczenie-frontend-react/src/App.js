import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Card from "./Components/Card"
import Home from "./Components/Home";
import axios from "axios";
import AddComponent from "./Components/AddComponent";
import Hero from "./Components/Header";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "")

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setUsername("")
    }
  }, [token]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Hero username={username} />}/>
        <Route path="/places" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/places/:id" element={<Card />}/>
        <Route path="/places/create" element={<AddComponent />}/>
      </Routes>
    </>
  );
}
