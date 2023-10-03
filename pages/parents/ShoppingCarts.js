// ShoppingCarts.js
import React, { useState } from 'react';
import Header from '../../components/Header';
import  styles from './ShoppingCarts.module.css';

function ShoppingCarts() {
  // Define your list of football-related items with additional information
  const footballItems = [
    {
      id: 1,
      name: 'Football Jersey',
      price: 29.99,
      image: 'football-jersey.jpg', // Replace with actual image paths
      rating: 4.5, // Replace with actual ratings
    },
    {
      id: 2,
      name: 'Football Shoes',
      price: 49.99,
      image: 'football-shoes.jpg',
      rating: 4.2,
    },
    {
      id: 3,
      name: 'Football',
      price: 19.99,
      image: 'football.jpg',
      rating: 4.0,
    },
    // Add more items as needed
  ];

  // State to manage the cart
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div>
      <Header />
      <div className="top-bar">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
        <div className="wishlist-icon">
          <span role="img" aria-label="Wishlist">
            ❤️
          </span>
        </div>
        <div className="cart-icon">
          <span role="img" aria-label="Cart">
            🛒
          </span>
          <span className="cart-count">{cart.length}</span>
        </div>
      </div>
      <h1>Shopping Cart</h1>
      <div className="item-list">
        <h2>Football Related Items</h2>
        <ul className="product-list">
          {footballItems.map((item) => (
            <li key={item.id} className="product-item">
              <div className="product-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div className="product-rating">
                  <span>Rating: {item.rating}</span>
                  {/* Add your rating component here */}
                </div>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingCarts;
