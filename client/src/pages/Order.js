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
        <>
            {foods.map((food) => {
                return (

                    <div key={food.food_id}>
                        <img src={`http://localhost:5000/${food.image}`} alt={food.name} />

                        <h4>{food.name}</h4>
                        <h4>{food.price}</h4>
                    </div>)

            })}
        </>
    )
}