import DeleteButton from "./DeleteButton"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'


export default function AdminFoodTable({showModal, setShowModal, setFoodInfoEdit}) {

    
    const foods = useSelector((state) => state.admin)

    function handleEdit(food_id) {
        setShowModal(true);

        fetch(`http://localhost:5000/food/${food_id}`)
            .then(res => res.json())
            .then(result => {
                setFoodInfoEdit({
                    ...result,
                    food_id: food_id
                })
            })
    }
    return (
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Name
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    price
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Category
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    image
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "

                >
                    Edit
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                >
                    Delete
                </th>
            </tr>

        </thead>

        <tbody className="divide-y divide-gray-200">
            {foods.map((item) => {
                return (
                    <tr key={item.food_id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {item.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{item.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {item.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <img src={item.image} alt={item.name} className="object-cover w-8 h-8" />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <button className="text-green-500 hover:text-green-700" onClick={() => handleEdit(item.food_id)}>
                                Edit
                            </button>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <DeleteButton item={item} />
                        </td>
                    </tr>
                )

            })}
        </tbody>
    </table>
        
    )
}