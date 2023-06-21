import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import { NavLayout } from "./NavLayout";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Admin from "./pages/Admin"
import { useState } from 'react';



function App() {
  const [cart, setCart] = useState([]);
  return ( 
    <Routes>
      <Route element={<NavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/admin" element={<Admin />} />
      </Route>


    </Routes>

  );
}

export default App;
