import React, { useEffect, useState } from "react";

export default function Checkout({ cart, setCart, total, handleIncreaseClick }) {
    const amount = cart.reduce((acc, item) => {
        return {
            ...acc,
            [item.food_id]: (acc[item.food_id] || 0) + 1,
        };
    }, {});

    const uniqueItems = cart.reduce((acc, current) => {
        const x = acc.find(item => item.food_id === current.food_id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, [])
    return (
        <div className="flex items-center justify-center my-2">
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                <div className="flow-root">
                    Carts
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">


                        {uniqueItems.map((item) => (
                            <li key={item.food_id} className="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="w-20 h-20" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {item.name}
                                        </p>
                                    </div>
                                    <button onClick={e => handleIncreaseClick(e, item)}>
                                        +
                                    </button>
                                    <div>
                                        {amount[item.food_id]}
                                    </div>
                                    <button>
                                        -
                                    </button>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                        <p>${item.price}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="text-center">Subtotal: ${total}</p>

                </div>
            </div>
        </div>
    )

}

