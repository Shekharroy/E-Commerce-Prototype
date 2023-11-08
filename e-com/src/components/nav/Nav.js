import React from "react";
import './Nav.css'

import { Link, NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="Navbar">
      <div className="Nav-Logo">E-Commerce Product</div>
      <div className="Nav-Links">
        <NavLink to="/" exact activeClassName='active'>Home</NavLink>
        <NavLink to="/Product" activeClassName='active'>Product</NavLink>
        <NavLink to="/Service" activeClassName='active'>Service</NavLink>
        <NavLink to="/About" activeClassName='active'>About</NavLink>
        <NavLink to="/Contact" activeClassName='active'>Contact</NavLink>
      </div>
    </div>
  );
}

export default Nav;
