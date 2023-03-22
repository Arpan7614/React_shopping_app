import React from 'react'
import styles from './css/Footer.module.css'

function Footer() {
    return (
        <>
            <div className={styles.main}>
            <h1>Bandage</h1>
            <hr/>
        <div className={styles.footer}>
            
            
            <div>
                <h3>Company Info</h3>
                <p>About us</p>
                <p>Carrier</p>
                <p>We are hiring</p>
                <p>Blog</p>
            </div>
            <div>
                <h3>Legal</h3>
                <p>About us</p>
                <p>Carrier</p>
                <p>We are hiring</p>
                <p>Blog</p>
            </div>
            <div>
                <h3>Features</h3>
                <p>Business Marketing</p>
                <p>User Analytics</p>
                <p>Live Chat</p>
                <p>Unlimited Support</p>
            </div>
            <div>
                <h3>Resources</h3>
                <p>IOS & Anroid</p>
                <p>Watch a demo</p>
                <p>Customers</p>
                <p>API</p>
            </div>
            </div>
            </div>
        </>
    )
}
export default Footer;