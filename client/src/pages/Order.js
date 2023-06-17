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
    })

    return (
        <>
            <h1>test</h1>
            <ul>
                {foods.map(f => <li>{f.name}</li>)}
            </ul>
        </>
    )
}