import React, { useEffect, useState } from "react";

export default function Checkout({ cart, setCart, total, handleIncreaseClick, handleDecreaseClick }) {
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
        <div className="flex flex-col items-center justify-center my-2">
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
                                            {item.name.toUpperCase()}
                                        </p>
                                    </div>
                                    <button onClick={e => handleIncreaseClick(e, item)}>
                                        +
                                    </button>
                                    <div>
                                        {amount[item.food_id]}
                                    </div>
                                    <button onClick={e => handleDecreaseClick(e, item)}>
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


            <div className="h-auto w-80 bg-white p-3 rounded-lg mt-8">
                <p className="text-xl font-semibold">Payment Details</p>

                <div className="input_text mt-8 relative">
                    <input type="text" className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="4242 4242 4242 4242" data-slots="0" data-accept="\d" size="19" />
                    <span className="absolute left-0 text-sm -top-4">Card Number</span>
                    <i className="absolute left-2 top-[14px] text-gray-400 text-sm fa fa-credit-card"></i>
                </div>
                <div className="mt-8 flex gap-5 ">
                    <div className="input_text relative w-full">
                        <input type="text" className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="mm/yyyy" data-slots="my" />
                        <span className="absolute left-0 text-sm -top-4">Expiry</span>
                        <i className="absolute left-2 top-4 text-gray-400 fa fa-calendar-o"></i>
                    </div>
                    <div className="input_text relative w-full">
                        <input type="text" className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="000" data-slots="0" data-accept="\d" size="3" />
                        <span className="absolute left-0 text-sm -top-4">CVV</span>
                        <i className="absolute left-2 top-4 text-gray-400 fa fa-lock"></i>
                    </div>
                </div>

                <div className="flex justify-center mt-4"> <button className="outline-none pay h-12 bg-orange-600 text-white mb-3 hover:bg-orange-700 rounded-lg w-1/2 cursor-pointer transition-all">Pay</button> </div>
                <div className="text-sm">Use "4242 4242 4242 4242" test card & valid expiration dates and zip code</div>
            </div>
        </div>
    )

}

