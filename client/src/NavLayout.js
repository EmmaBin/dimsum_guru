import { NavLink, Link, Outlet } from "react-router-dom";


export function NavLayout() {
    return (
        <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/order">Order</NavLink>
            <NavLink to="/checkout">Cart</NavLink>
            <Outlet />
        </>
    )
}