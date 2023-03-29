import React, { useEffect,useState } from 'react'
import styles from "./css/Product.module.css";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../helpers/getUserid";


async function addtoCart(data) {
    const res = await fetch("http://localhost:8000/cartadd", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    
    const data1 = await res.json();
    console.log(data1)
    return data1;
  }

  async function deleteFromCart(data) {
    const res = await fetch("http://localhost:8000/cartdeleteitem", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  
    const data1 = await res.json();
    console.log(data1);
    return data1;
  }

export const Product= (props) => {
    console.log(props)
    const item = props.product
    const cart = props.cartItems
   
    
    const [text, setText] = useState("Add to Cart")
    

    const navigate = useNavigate();

    function checkIfInCart(product) {
        let res = false
        if (cart && product) {
            cart.forEach((item, ind) => {
                if (item.id === product.id) {
                    res = true;
                }
            })
        }
        return res;
    };

    const state = checkIfInCart(item)
    useEffect(() => {
        if (state === true) {
            setText("Remove from Cart")
            
        }
    }, [state])



    const fetchProductById = (id, item, cart) => {
       
        navigate(`/details/${id}`, {
             state: { product: item, cartItems:cart } 
        });
    }

    const handleButtonClick = async (event, item) => {
        event.stopPropagation()
        const userId = getUserId();
        if (!userId) {
            window.alert("Please login to add products!")
            return;
        }
        if (text === "Add to Cart") {
            console.log("itemId= " + item.id);
            const data = {
                userid:userId,
                productid: item.id,
                amount: item.price,
                discount:item.discount,
            }

            const result = await addtoCart(data);
            console.log(result);
            if (result.length>=1) {
                
                setText("Remove from Cart")
            }
        }
        if (text === "Remove from Cart") {
            const data = {
                userid:userId,
                productid: item.id,
            };
            const result = await deleteFromCart(data).then((res) => res.status);
            if (result === "success") {
                console.log("deleted from cart");
                
                setText("Add to Cart")
            }
        }
    }
    return (
        <div>
            
            <div className={styles.container}>
                
                <div>
                    
                    <img
                        onClick={() => fetchProductById(item.id, item, cart)}
                        className={styles.img}
                        src={item?.images}
                        alt=""
                    />

                    <div
                        className={styles.info}>
                        <h3> {item.name}</h3>
                        <p>{item.meta.description}</p>

                        <div>
                            <span>&#8377;{item.price}</span>
                            <span>&#8377;{item.discount}</span>
                        </div>
                        
                        <button
                            className={styles.btn}
                            onClick={(e) => handleButtonClick(e, item)}>
                            {text}  
                        </button>
                    </div>
                </div>
						
				
            </div>
           
        </div>
    )
}