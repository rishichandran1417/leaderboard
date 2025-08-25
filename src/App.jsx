import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Leaderboard from "./Leaderboard.jsx";
import Ideacamp from "./Ideacamp.jsx";
import Navbar from "./Navbar.jsx";
import "./styles.css";







export default function App() {
  return (
    <BrowserRouter>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/ideacamp" element={<Ideacamp />} />
      </Routes>
    </BrowserRouter>
  );
}