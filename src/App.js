import React, { useState } from "react";
// import { getUserId } from '../src/helpers/getUserid'
import { useEffect } from "react";
import axios from "axios";
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
import { AllProductsComponent } from "./component/AllProductComponent";
import Details from "./component/Details";
import Cart from "./component/Cart";

import { Card } from "./component/Product";

function App() {
	return (
		<div className="App">
			{/* <ProductProvider>
				<Product/>
				<Cart />
			</ProductProvider> */}
			<div className="Header">
				<BrowserRouter>
					<Routes>
						<Route path="/products" element={<AllProductsComponent />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/details/:id" element={<Details />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
