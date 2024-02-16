import { NavLink, Link, Outlet } from "react-router-dom";
import Logo from "../assets/dimsum_logo.png"
import React from "react"
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import store from "../store/store";


export function NavLayout() {
    const [showFood, setShowFood] = useState(false)
    const total = useSelector((state) => state.cart)
    const cartTotal = total.length
    console.log("looking for cart total", cartTotal)


    return (
        <div className="w-full md:block md:w-auto" id="navbar-default">
            <div className="flex flex-col px-8 md:flex-row md:items-center md:justify-between">
                <img className="w-36 h-36 mx-auto md:mx-0" src={Logo} alt="dim sum logo" />
                <ul className="font-medium flex flex-col md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <NavLink className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            style={({ isActive }) => {
                                return isActive ? { fontWeight: '600', textDecoration: 'underline' } : {}
                            }}
                            to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            style={({ isActive }) => {
                                return isActive ? { fontWeight: '600', textDecoration: 'underline' } : {}

                            }}
                            to="/order"
                        >Order</NavLink>
                    </li>
                    <li>
                        <NavLink className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            style={({ isActive }) => {
                                return isActive ? { fontWeight: '600', textDecoration: 'underline' } : {}
                            }}
                            to="/admin">Admin</NavLink>
                    </li>
                    {/* <li>
                        <NavLink className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            style={({ isActive }) => {
                                return isActive ? { fontWeight: '600', textDecoration: 'underline' } : {}
                            }}
                            to="/checkout">Cart</NavLink>
                    </li> */}
                    <li class="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                    <NavLink to="/checkout">
                        <a href="#" role="button" className="relative flex">
                            <svg class="flex-1 w-8 h-8 fill-current" viewbox="0 0 24 24" >
                                <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                            </svg>
                            <span class="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{cartTotal}
                            </span>
                            </a>
                         </NavLink>
                    </li>
                </ul>
            </div>
            <Outlet context={[showFood, setShowFood]} />
            <footer className="flex flex-col items-center justify-center text-center p-4 bg-indigo-100">
                <h4 className="mb-4">Experience Authentic Oriental Flavors. #DimsumDelights</h4>
                <h5 className="mb-2">©2023 Copyright Dimsum Guru | Coded with 💗 by Bin Ma (Emma)</h5>
            </footer>
        </div>
    )
}