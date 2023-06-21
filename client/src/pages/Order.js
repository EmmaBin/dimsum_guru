import React, { useEffect, useState } from "react";

const getAllFood = async () => {
    try {
        const response = await fetch("http://localhost:5000/foods");
        const jsonData = await response.json();


        console.log(jsonData)
        return jsonData;
    } catch (err) {
        console.error(err.message)
    }
}

export default function Order() {
    const [foods, setFoods] = useState([])
    useEffect(() => {
        getAllFood()
            .then((result) => setFoods(result))
    }, [])

    return (
        <div className="grid grid-cols-2 gap-y-10 gap-x-0 place-items-center my-4">
            {foods.map((food) => {
                return (

                    <div key={food.food_id} className="w-full md:w-4/5" >
                        <div className="w-full h-48 md:h-64 relative overflow-hidden">
                            <img src={`http://localhost:5000/${food.image}`} alt={food.name} className="absolute top-0 left-0 w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between text-slate-950">
                            <h4>{food.name.toUpperCase()}</h4>
                            <h4>{food.price}</h4>
                        </div>
                    </div>)

            })}
        </div>
    )
}