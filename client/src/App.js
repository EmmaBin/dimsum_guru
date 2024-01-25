import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import { NavLayout } from "./NavLayout";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Admin from "./pages/Admin"
import { useState, useEffect } from 'react';
import AdminContent from "./pages/AdminContent";
import store from './store/store'
import { Provider } from 'react-redux'



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

  
  
  useEffect(() => {
    if (orderID) {
      // fetch order contents from backend
      // and save to cart with setCart

      fetch(`http://localhost:5000/order/${orderID}`)
        .then(res => res.json())
        .then(result => {
          console.log(result)
          store.dispatch({ type: 'fetch_cart', cart: result['orderItems'] })
          
        })
    }
  }, [orderID])

  function handleIncreaseClick(e, food) {
    e.preventDefault()
    store.dispatch({ type: 'added', ...food })
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
        store.dispatch({ type: 'deleted', food_id: food.food_id })
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });

  }

  


  return (
    <Provider store={store}>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order orderID={orderID} handleIncreaseClick={handleIncreaseClick} />} />
          <Route path="/checkout" element={<Checkout handleIncreaseClick={handleIncreaseClick} handleDecreaseClick={handleDecreaseClick} orderID={orderID} />} />
          <Route path="/admin" element={<Admin setToken={setToken} />} />
          <Route path="/admin-account" element={<AdminContent token={token} />} />
        </Route>
      </Routes>
    </Provider>

  );
}

export default App;
