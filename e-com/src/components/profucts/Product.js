import React, { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import {Link} from "react-router-dom";

function Product() {
  const [state, setState] = useState([]);

  useEffect(()=>{
    axios
    .get(`https://fakestoreapi.com/products`)
    .then((res) => {
      console.log(res.data);
      setState(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },[])

  const getProductsData = (category) =>{
    axios
    .get(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => {
      console.log(res.data);
      setState(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const getAllProductData = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="ProductContainer">
      <div className="left-menu-section">
        <button onClick={getAllProductData}>All Products</button>
        <button onClick={()=>{getProductsData("electronics")}}>Electronics</button>
        <button onClick={()=>{getProductsData("jewelery")}}>Jewellery</button>
        <button onClick={()=>{getProductsData("men's clothing")}}>Mens Clothing</button>
        <button onClick={()=>{getProductsData("women's clothing")}}>Womens Clothing</button>
      </div>
      <div className="right-crad-section">
        {state.length > 0 ? (
          <div className="ProductDetails">
            {
                state.map((elements)=>{
                    return <div className="ProductCard">
                        <img src={elements.image} width="100%" height={200} alt="products-image"/>
                        <h4>{elements.title}</h4>
                        <p>${elements.price}</p>
                       <Link to="/ProductDetails"><button>Product Details</button></Link> 
                    </div>
                })
            }
          </div>
        ) : (
          <div>
            <h2>No Product Data to Display</h2>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
