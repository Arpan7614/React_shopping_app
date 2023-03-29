import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserId } from "../helpers/getUserid";
import { Navbar } from "./Navbar";
import {  useNavigate } from "react-router-dom";
import styles from "../component/css/Cart.module.css";
function Cart() {
    const userId = getUserId();
    const navigate = useNavigate();
    // console.log(userId)
    const [products, setProducts] = useState([]);
    const [ordertotal, setorderTotal] = useState(0);
    const [state, setState] = useState(true);

    useEffect(() => {
        fetchProducts();
        getOrderTotal();
    }, [products]);
    const fetchProducts = () => {
        axios
            .post("http://localhost:8000/cart", {
                userid: userId
            })
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    

    const handleChangedQuantity = async (event, product) => {
        const data = {
            userid: product.userid,
            productid: product.productid,
            quantity: parseInt(event.target.value),
        };
       
        const result = await updateQuantity(data).then((res) => res.status);
        if (result === "success") {
            console.log("updated quantity");
            setState(!state);
        }
    };
    

    

    const getOrderTotal = () => {
        let sum = 0;
        Array.from(products).map((product) => {
            sum += parseInt(product.price) * parseInt(product.quantity);
        });
        setorderTotal(sum);
        return sum;
    };
    

    async function updateQuantity(data) {
        const res = await fetch("http://localhost:8000/UpdateQuantity", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
        // let cart = products.map((v) => ({ ...v, added: false }));
        async function deleteFromCart(data) {
            console.log(data);
            const res = await fetch("http://localhost:8000/cartdeleteitem", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            const data0 = await res.json();
            console.log(data0);
            return data0;
        }
    
    
    async function handlePlaceOrder(event) {
        const data = {
            userid: userId,
            info: products,
            amount:ordertotal
            
        }
        console.log(data)
        
        axios
            .post("http://localhost:8000/deleteAllCart", {
                data
            })
            .then((res) => {
                console.log("deleted")
                navigate('/order');
            })
            .catch((err) => {
                console.log(err);
            });
        
    }

        return (
            <div>
                <Navbar />
                <div>
                    {Array.from(products).map((product) => {
                        return (
                            <div className={styles.product}>
                                <img className={styles.img} src={product.images} />
                                <div className={styles.details}>
                                    <h2>{product.name}</h2>
                                    <div>{product.meta.description}</div>
                                    <p>&#8377;{product.price}</p>
                                    <div className={styles.buttons}>
                                        <select
                                            name="quantity"
                                            id="qty"
                                            defaultValue={product.quantity}
                                            className={styles.quantity}
                                            onChange={(event) => handleChangedQuantity(event, product)}
                                            >
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                        </select>
                                        <button
                                            className={styles.removebtn}
                                            onClick={(e) =>
                                                deleteFromCart({ userid: userId, productid: product.id })
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className={styles.orderContainer}>
                        <h2>Order Summary</h2>
                        <hr />
                        <div className={styles.orderData}>
                            <span>Order Value</span>
                            <span>{ordertotal}</span>
                        </div>

                        <div className={styles.orderData}>
                            <span>Before discount</span>
                            <span>{ordertotal}</span>
                        </div>

                        <div className={styles.orderData}>
                            <span className={styles.highlight}>TOTAL</span>
                            <span className={styles.highlight}>{ordertotal}</span>
                        </div>

                        <button
                            className={styles.placeOrderBtn}
                            onClick={(event) => handlePlaceOrder(event)}
                        >Place Order</button>
                        <span className={styles.notice}>
                            *Custom orders need a few working days to be created. More info here
                        </span>
                    </div>
                </div>
                
            </div>
        );
    }


export default Cart;
