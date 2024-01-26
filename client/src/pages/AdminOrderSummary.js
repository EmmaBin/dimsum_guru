import React, { useEffect, useState } from "react";
import getAllFood from "../components/getAllfood";
import store from "../store/store";
import { useSelector, useDispatch } from 'react-redux'

function handleDeleteFood(food_id) {
    try {
        fetch(`http://localhost:5000/admin/${food_id}`, {
            method: "DELETE"
        }).then(response => {
            store.dispatch({ type: 'delete_from_menu', food_id: food_id })
        })

    } catch (err) {
        console.error(err.message)
    }

}

export default function AdminOrderSummary({ showModal, setShowModal, foodInfoEdit, setFoodInfoEdit }) {
    const [showForm, setShowForm] = useState(false)
    const [formDetail, setFormDetail] = useState({
        name: "",
        price: "",
        category: "",
        image: ""
    })
    const handleChange = (event) => {
        setFormDetail({
            ...formDetail,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        getAllFood()
            .then((result) => {
                store.dispatch({ type: 'read_all_food', foods: result })
            });
    }, [])
    //highlight here!!!
    const foods = useSelector((state) => state.admin)


    function handleEdit(food_id) {
        setShowModal(true);

        fetch(`http://localhost:5000/food/${food_id}`)
            .then(res => res.json())
            .then(result => {
                setFoodInfoEdit({
                    ...result,
                    food_id:food_id
                })
                
               
            })
    }
        
    function handleFormSubmit(e) {
        e.preventDefault()
        store.dispatch({ type: 'added_one_item', food_id: formDetail.food_id, name: formDetail.name, price: formDetail.price, image: formDetail.image })
        fetch(`http://localhost:5000/admin/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDetail)
        }
        )

    };
    return (


        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
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
                                                <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="object-cover w-8 h-8" />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button className="text-green-500 hover:text-green-700" onClick={() => handleEdit(item.food_id)}>
                                                    Edit
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteFood(item.food_id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                        </table>
                    </div>
                    <button className="bg-indigo-100 hover:bg-indigo-200 text-black font-bold py-2 px-4 rounded-full uppercase mt-4" onClick={() => setShowForm(!showForm)}>add new item to menu</button>
                    {showForm &&
                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="inputName" >NAME:</label>
                            <input type="text" className="border" name="name" id="inputName" value={formDetail.name} onChange={handleChange}></input>
                            <label htmlFor="price">PRICE:</label>
                            <input type="text" className="border" name="price" id="price" value={formDetail.price} onChange={handleChange}></input>
                            <label htmlFor="category">CATEGORY:</label>
                            <input type="text" className="border" name="category" id="category" value={formDetail.category} onChange={handleChange}></input>
                            <label htmlFor="image">IMAGE:</label>
                            <input type="text" className="border" name="image" id="image" value={formDetail.image} onChange={handleChange}></input>
                            <button type="submit" className="bg-indigo-100 hover:bg-indigo-200 text-gray font-bold py-2 px-4 rounded-full uppercase ml-4">Submit</button>
                        </form>}
                </div>
            </div>
        </div>

    )
}