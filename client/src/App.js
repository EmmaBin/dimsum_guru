import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import { NavLayout } from "./NavLayout";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Admin from "./pages/Admin"
import { useState, useEffect } from 'react';



function App() {
  // save orderID to localStorage
  const [orderID, setOrderID] = useState(localStorage.getItem("orderID"));

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
  const [total, setTotal] = useState(0)
  useEffect(() => {
    if (orderID) {
      // fetch order contents from backend
      // and save to cart with setCart

      fetch(`http://localhost:5000/order/${orderID}`)
        .then(res => res.json())
        .then(result => {
          setCart(result["orderItems"])
          setTotal(Number(result["total"]))

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

  return (
    <Routes>
      <Route element={<NavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order cart={cart} setCart={setCart} orderID={orderID} handleIncreaseClick={ handleIncreaseClick} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} total={total} handleIncreaseClick={ handleIncreaseClick}/>} />
        <Route path="/admin" element={<Admin />} />
      </Route>


    </Routes>

  );
}

export default App;
