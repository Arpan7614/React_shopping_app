import React from "react";
import styles from './css/Details.module.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import { useEffect , useState} from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
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


function Details() {
    const [text, setText] = useState("Add to Cart")
    const { state } = useLocation();
    
    const item = state.product;
    const cart = state.cartItems;

    
    
    
    const initialState = {
        // id: "",
        carouselimg: [],
        name: "",
        discount: "",
        meta: {},
        
        
    }
    const [productById, setProductById] = useState(initialState);
    const { id } = new useParams();
    

    useEffect(() => {
        fetchProductById(id);
    }, [id]);
    
    const fetchProductById = (id) => {
        axios
            .get(`http://localhost:8000/find/${id}`)
        
            .then((res) => {
                console.log(res.data)
                setProductById(res.data.data);
                console.log(productById.carouselimg);
                
            })
            .catch((err) => {
                console.log(err);
                console.log("not ok")

            });
    };


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

    const stateVar = checkIfInCart(item)
    useEffect(() => {
        if (stateVar === true) {
            setText("Remove from Cart")
            
        }
    }, [stateVar])


    const handleButtonClick = async (event, item) => {
        event.stopPropagation()
        const userId = getUserId();
        if (!userId) {
            alert("Please login to add products!")
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
            console.log("del")
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
        <>
        <div className={styles.main}>
            <div className={styles.carousel}>
                <Navbar/>
                {Array.from(productById).map((img) => {
                
                    return (
                        <Carousel className={styles.main_carousel}>
                            <div>
                                <img src={img.carouselimg[0]} />
                            </div>
                            <div>
                                <img src={img.carouselimg[1]} />
                            </div>
                            <div>
                                <img src={img.carouselimg[2]} />
                            </div>
                        
                        </Carousel>
                        
                    )
                })}
            </div>
            
            <div>
                {Array.from(productById).map((product) => {
                    return (
                        <div className={styles.details}>
                            <p>{product.name}</p>
                            <h3>{product.discount}</h3>
                            <p>{product.meta.description}</p>
                            <button
                                className={styles.btn}
                                onClick={(e) => handleButtonClick(e, item)}
                            >{text}</button>
                        </div>
                    )
                })}
            </div>
            
        </div>
            <Footer />
            </>
    
                
                
        )

            
    
                

}
				
export default Details;
