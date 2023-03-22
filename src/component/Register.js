
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './css/Register.css'
import { Navbar } from "./Navbar";
import {toast} from "react-toastify"
import { Link } from "react-router-dom";
import AuthApi from "../Api/AuthApi";

export const Register = () => {
    const [inputField, setInputField] = useState({
        name: "",
        useremail: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate()
    const handleOnChange = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        AuthApi.post("/register", inputField)
            .then((res) => {
                const data = res.data;
                toast.success("Account created")
                if (data.success) {
                    console.log("login ")
                    setTimeout(() => {
                        navigate("/");
                    },0);
                }
            })
            .catch((err) => {
    
                toast.error(err.response.data.error);
            });
    };

    
    return (
        <div>
            <Navbar />
            <div className="register-container ">
                <div className="head">Register your Account</div>
                <div className="register-form">
                    <div className="email-reg">Email</div>
                    <input
                        className="email-holder-reg"
                        type="email"
                        placeholder="Enter your Email"
                        name="useremail"
                        onChange={handleOnChange}
                    />
                    <div className="email-reg" >Name</div>
                    <input
                        className="email-holder-reg"
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        onChange={handleOnChange}
                    />
                    <div className="email-reg" >password</div>
                    <input
                        className="email-holder-reg"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        onChange={handleOnChange}
                    
                    />
                    <div className="email-reg" >Confirm Password</div>
                    <input
                        className="email-holder-reg"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={handleOnChange}
                    /><br />
                    <button
                        className="signup-btn"
                        type="submit"
                        onClick={handleOnSubmit}
                    >Signup</button>
                </div>
            
                <div className="user-reg">
                    <span>Already Registered?</span>
                    <span className="btn"><Link style={{textDecoration: 'none' ,color:"#4169E1"}} to="/">Login</Link></span>
                
            
                </div>
            </div>

        </div>
    )
};