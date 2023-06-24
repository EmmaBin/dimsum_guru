import React, { useEffect, useState } from "react";

export default function Checkout({ cart, setCart }) {

    return (
        <div className="bg-blue-200">
            Here is the cart info
            {cart.map((food) => {

                return (
                    <div>
                        <h1>Food ID: {food}</h1>

                    </div>
                );
            })}


        </div>
    )

}