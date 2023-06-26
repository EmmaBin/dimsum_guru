import React, { useEffect, useState } from "react";

export default function Checkout({ cart, setCart, total }) {

    return (
        <div className="bg-blue-200">
            Here is the cart info
            {cart.map((item) => (
                <div key={item.food_id}>
                    <p>{item.food_id}</p>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <img src={item.image} alt={item.name} />
                </div>
            ))}
            <p>Here is the total price: {total}</p>

        </div>
    )

}