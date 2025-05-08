import React from 'react'
import './App.css'
import LandingPage from './pages/landing_page/LandingPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Compare from "./pages/Compare/Compare";
import Login from "./pages/Login/Login";

function App() {

  return (
    <>
      <LandingPage/>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router> */}

      
    </>
  )
}

export default App
