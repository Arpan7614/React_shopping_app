import React from "react";
import styles from './css/Details.module.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import { useEffect , useState} from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

function Details() {
    const initialState = {
        // id: "",
        carouselimg: [],
        name: "",
        discount: "",
        meta: {},
        
        
    }
    const [productById, setProductById] = useState(initialState);
    const { id } = new useParams();
    console.log(id);

    useEffect(() => {
        fetchProductById(id);
    }, [id]);
    console.log(id);
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
                            <button className={styles.btn}>Add to Cart</button>
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
