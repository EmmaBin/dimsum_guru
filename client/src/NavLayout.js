import { NavLink, Link, Outlet } from "react-router-dom";


export function NavLayout() {

    return (
        <div class="w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <NavLink className={"block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}
                        style={({ isActive }) => {
                            return isActive ? { fontWeight: '600', textDecoration: 'underline' } : {}
                        }}
                        to="/">Home</NavLink>
                </li>
                <NavLink className={"block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}
                    style={({ isActive }) => {
                        return isActive ? { fontWeight: '600', textDecoration: 'underline' } : {}
                    }}
                    to="/order">Order</NavLink>
                <NavLink className={"block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}
                    style={({ isActive }) => {
                        return isActive ? { fontWeight: '600', textDecoration: 'underline' } : {}
                    }}
                    to="/checkout">Cart</NavLink>

            </ul>
            <Outlet />
            <footer className="flex flex-col items-center justify-center text-center p-4">
                <h4>Experience Authentic Oriental Flavors at Our Dimsum Restaurant. Embrace the Journey of Asian Gastronomy Today. #DimsumDelights</h4>
                <h5>©2023 Copyright Dimsum Guru | Coded with 💗 by Bin Ma (Emma)</h5>
            </footer>
        </div>
    )
}