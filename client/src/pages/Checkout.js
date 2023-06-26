import React, { useEffect, useState } from "react";

export default function Checkout({ cart, setCart, total }) {

    return (
        <div className="bg-blue-200">
            Here is the cart info
            {cart.map((item) => (
                <div key={item.food_id} className="flex">
                    <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="w-20 h-20"/>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    
                </div>
            ))}
            <p>Here is the total price: {total}</p>

        </div>
    )

}