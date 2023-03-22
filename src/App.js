import React, { useState } from "react";
import "./App.css";
import {
	Route,
	Link,
	Routes,
	BrowserRouter as Router,
	BrowserRouter,
} from "react-router-dom";

import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { Navbar } from "./component/Navbar";
import { ProductList } from "./component/Products";
import Details from "./component/Details";
import Cart from "./component/Cart";

function App() {
	// const [currentForm, setCurrentForm] = useState("login");

	// const toggleForm = (formName) => {
	// 	setCurrentForm(formName);
	// };

	return (
		<div className="App">
			<div className="Header">
				<BrowserRouter>
					<Routes>
						<Route path="/products" element={<ProductList />} />
						<Route path="/" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/details/:id" element={<Details />} />
						<Route path="/cart" element={<Cart/>}/>
					</Routes>
				</BrowserRouter>

			</div>
		</div>
	);
}

export default App;
