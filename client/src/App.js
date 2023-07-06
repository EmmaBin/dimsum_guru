import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import { NavLayout } from "./NavLayout";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Admin from "./pages/Admin"
import { useState, useEffect } from 'react';
import AdminContent from "./pages/AdminContent";



function App() {
  // save orderID to localStorage
  const [orderID, setOrderID] = useState(localStorage.getItem("orderID"));
  const [token, setToken] = useState(null)

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token")
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }, [])

  useEffect(() => {
    // initialize state if fresh page load
    if (!orderID) {
      // fetch and set the order id
      fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(result => {
          localStorage.setItem("orderID", result.id);
          setOrderID(result.id);
        })

    }
  }, [])

  const [cart, setCart] = useState([]);
  const total = cart.reduce((sum, food) => sum + food.price, 0)
  useEffect(() => {
    if (orderID) {
      // fetch order contents from backend
      // and save to cart with setCart

      fetch(`http://localhost:5000/order/${orderID}`)
        .then(res => res.json())
        .then(result => {
          setCart(result["orderItems"])
        })

    }
  }, [orderID])

  function handleIncreaseClick(e, food) {
    e.preventDefault()
    setCart(prevCart => [...prevCart, food]);
    console.log(cart)
    fetch(`http://localhost:5000/order/${orderID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ foodID: food.food_id })
    }
    )
  }

  function handleDecreaseClick(e, food) {
    e.preventDefault();

    fetch(`http://localhost:5000/order/${orderID}?foodID=${food.food_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // filter the cart items
        setCart(prevCart => prevCart.filter(item => item.food_id !== food.food_id));
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });

  }




  return (
    <Routes>
      <Route element={<NavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order cart={cart} setCart={setCart} orderID={orderID} handleIncreaseClick={handleIncreaseClick} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} total={total} handleIncreaseClick={handleIncreaseClick} handleDecreaseClick={handleDecreaseClick} orderID={orderID} />} />
        <Route path="/admin" element={<Admin setToken={setToken} />} />
        <Route path="/admin-account" element={<AdminContent token={ token } />} />
      </Route>


    </Routes>

  );
}

export default App;
