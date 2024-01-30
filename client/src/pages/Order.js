import React, { useEffect, useState } from "react";
import getAllFood from "../utils/getAllfood";



export default function Order({ handleIncreaseClick }) {
    const [foods, setFoods] = useState([])
    useEffect(() => {
        getAllFood()
            .then((result) => setFoods(result))
    }, [])

    return (
        <div className="grid grid-cols-2 gap-y-10 gap-x-0 place-items-center my-4">
            {foods.map((food) => {
                return (

                    <div key={food.food_id} className="w-full md:w-4/5 group" >
                        <div className="w-full h-48 md:h-64 relative overflow-hidden">
                            <img src={food.image} alt={food.name} className="absolute top-0 left-0 w-full h-full object-cover rounded-md hover:blur-sm" />
                            <button className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-500 p-2 rounded-md px-8 text-white"
                                onClick={e => handleIncreaseClick(e, food)}>ADD TO CART</button>
                        </div>
                        <div className="flex justify-between text-slate-950 px-8">
                            <h4>{food.name.toUpperCase()}</h4>
                            <h4>${food.price}</h4>
                        </div>

                    </div>)

            })}
        </div>
    )
}