import React, { useEffect, useState } from "react";

export default function Checkout({ cart, setCart, total }) {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flow-root">
                    Here is the cart info
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">


                        {cart.map((item) => (
                            <li key={item.food_id} className="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="w-20 h-20" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {item.name}
                                        </p>

                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <p>${item.price}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p>Here is the total price: {total}</p>

                </div>
            </div>
        </div>
    )

}

