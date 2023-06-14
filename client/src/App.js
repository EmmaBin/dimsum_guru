import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import { NavLayout } from "./NavLayout";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";


function App() {
  return (
    <Routes>
      <Route element={<NavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>


    </Routes>

  );
}

export default App;
