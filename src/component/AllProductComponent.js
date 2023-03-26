import { useState, useEffect } from "react";
import { getUserId } from "../helpers/getUserid";
import { Product } from "./Product";
import axios from "axios";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import styles from "./css/Product.module.css";


export const AllProductsComponent = () => {
	const userId = getUserId();
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8000/products").then((response) => {
			setProducts(response.data.data);
			console.log(response.data.data);
		});
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [products]);
	const fetchProducts = () => {
		axios
			.post("http://localhost:8000/cart", {
				userid: userId,
			})
			.then((res) => {
				setCart(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	console.log(products.length);
	return (
		<div className={styles.container}>
			<Navbar />
			{Array.from(products).map((item, index) => (
				<div key={item.id}>
					<Product product={item} cartItems={cart} />
				</div>
			))}
			<Footer />
		</div>
	);
};
