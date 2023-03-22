import React from 'react'
import './Nav.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
function Navbar() {
  return (
    <div className='nav'>
      <div className='heading'>Shopping Site </div>
      <div className='person-icon'><i class="fa-regular fa-user"></i></div>
      <div className='nav-login'><Link style={{textDecoration: 'none' , color: "#4169E1"}} to="/">Login</Link></div>
      <div className='nav-register'>/</div>
      <div className='nav-register'><Link style={{textDecoration: 'none' ,color:"#4169E1"}} to="/register">Register</Link></div>
      <div className='cart-icon'><Link to="/cart"></Link><i class="fa-solid fa-cart-shopping"></i></div>
          
    </div>
  )
}

export { Navbar };