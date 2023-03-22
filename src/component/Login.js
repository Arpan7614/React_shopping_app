import React, { useState , useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { toast } from "react-toastify";
import { ProductList } from "./Products";
import { Link } from "react-router-dom";


import API from "../Api/AuthApi";


export const Login = () => {

    const [inputField, setInputField] = useState({
        useremail: "",
        password: "",
      });
    console.log(inputField);
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem("token")
       
        if(token) {
          navigate("/products")
          return
        }
    
    }, [])
    
    const handleOnChange = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value });
      };

    
    const submitClick=(e)=>{
        e.preventDefault();
        console.log(inputField)
        API.post("/login", inputField)
            .then((res) => {
                const data = res.data;
                const token = data.data;
                toast.success("Login Successful")
                if (token) {
                    localStorage.setItem("token", token);
                    setTimeout(() => {
                        navigate("/products");
                    }, 0);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.error);
            });
    };
        

    
    


    return (
    <>
            <Navbar/>
        <div className="login">
            <div className="login-heading">Welcome back to</div>
            <div className="login-bandage">Bandage</div>
            <form className="login-form" >
                    <h2 className="email">Email</h2>
                    <input
                        className="email-holder"
                        type="email"
                        name="useremail"
                        placeholder="Enter Your Email"
                        onChange={handleOnChange}
                         /><br />
                <label className="password">Password</label><br/>
                    <input
                        className="password-holder"
                        type="password"
                        placeholder="Enter Your Password"
                        name="password"
                        onChange={handleOnChange}
                    /><br />
                    <button
                        onClick={submitClick}
                        className="submit-btn"
                        type="submit">Login
                    </button>
            </form>
            <div className="user">
                    <span>New User?</span>

                    <span className="btn"><Link style={{textDecoration: 'none' ,color:"#4169E1"}} to="/register">Register</Link></span>
                    
               
                </div>
        </div>
            </>
    )
}
