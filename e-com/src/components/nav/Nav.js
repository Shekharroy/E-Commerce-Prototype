import React from "react";
import './Nav.css'
import Home from "../home/Home";

function Nav() {
  return (
    <div className="Navbar">
      <div className="Nav-Logo">E-Commerce Product</div>
      <div className="Nav-Links">
        <a href="/Home.js">Home</a>
        <a href="http://">Product</a>
        <a href="http://">Service</a>
        <a href="http://">About</a>
        <a href="http://">Contact</a>
      </div>
    </div>
  );
}

export default Nav;
