import React from "react";
import styles from "./css/Product.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { getUserId } from "../helpers/getUserid";

export const ProductList = () => {
	const [products, setProducts] = useState([]);
	//const [cartproducts, setcartProducts] = useState([]);

	const userId = getUserId();
	console.log(userId);
	const navigate = useNavigate();

	function fetchProductById(id) {
		navigate(`/details/${id}`);
	}

	useEffect(() => {
		fetchProducts();
	}, []);
	const fetchProducts = () => {
		axios
			.get("http://localhost:8000/products")
			.then((res) => {
				setProducts(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let cart = products.map((v) => ({ ...v, added: false }));

	useEffect(() => {
		setProducts(cart);
	}, []);
	console.log("added", cart);

	async function addtoCart(data) {
		console.log("add");
		const res = await fetch("http://localhost:8000/cartadd", {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		});
		const data0 = await res.json();
		return data0;
	}
	async function deleteFromCart(data) {
		const res = await fetch("http://localhost:8000/cartdeleteitem", {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		});
		const data0 = await res.json();
		console.log(data0);
		return data0;
	}

	const handleButtonClick = async (event, item, index) => {
		setProducts(
			Array.from(cart).map((val) => {
				if (val.id === item.id) {
					val.added = true;
				}

				return val;
			})
		);

		event.stopPropagation();

		if (!userId) {
			alert("Please login to add products!");
			return;
        }
        
		if (event.target.innerHTML.trim() === "Add to Cart") {
			const data = {
				userid: userId,
				productid: item.id,
                amount: item.price,
                discount:item.discount,
               
			};
			const result = await addtoCart(data).then((res) => {
				if (res) {
					event.target.innerHTML = "Remove from Cart";
				}
			});
		} else if (event.target.innerHTML === "Remove from Cart") {
			const data = {
				userid: userId,
				productid: item.id,
			};
			const result = await deleteFromCart(data).then((res) => res);
			if (result) {
				console.log("deleted from cart");
				event.target.innerHTML = "Add to Cart";
			}
		}
	};

	return (
		<div>
			<div className={styles.container}>
				<Navbar />

				{Array.from(products).map((product, index) => {
					return (
						<div key={index}>
							<img
								onClick={() => fetchProductById(product.id)}
								className={styles.img}
								src={product.images}
								alt=""
							/>
							<div className={styles.info}>
								<h3> {product.name}</h3>
								<p>{product.meta.description}</p>
								<div>
									<span>&#8377;{product.price}</span>
									<span>&#8377;{product.discount}</span>
								</div>
								<button
									className={styles.btn}
									onClick={(e) => handleButtonClick(e, product, index)}
								>
									{product.added ? "Remove from Cart" : "Add to Cart"}{" "}
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<Footer />
		</div>
	);
};
