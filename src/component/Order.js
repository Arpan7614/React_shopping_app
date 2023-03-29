import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from './css/Order.module.css';
import {useLocation} from 'react-router-dom';


export const Order = ( ) => {

    const navigate = useNavigate();
    
    let status = true
   
    

    const handleButtonClick = () => {
        navigate("/products");
    }

  return (
    <>
    <div className={styles.mainContainer}>
         <div className={styles.body}>
            <div className={styles.order}>
            {status ? (
                <>
                <img src='https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png' alt=';-)'
                className={styles.img}
                />
                <h1 style={{color:"#3669C9"}}>Thank You!</h1>
                <span>Your Order has been placed successfully!</span>
                <br/>
                <span >Order id : 85897860-9598-11ed-8abe-b1008eaff2cd</span>
                </>
            ):(
                <>
                <img src='https://i.pinimg.com/originals/d0/17/47/d01747c4285afa4e7a6e8656c9cd60cb.png' alt=':,('
                className={styles.img}
                />
                <h1 style={{color:"#3669C9"}}>Sorry!</h1>
                <span>Your Order has been failed!</span>
                </> 
            )}
            
            <button onClick={()=>handleButtonClick()} className={styles.btn}> Back to Home</button>
            </div>
         </div>
    </div>
    
    </>
  )
}