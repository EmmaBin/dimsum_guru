import React, { useEffect, useState } from "react";
import getAllFood from "../../utils/getAllfood";
import store from "../../store/store";
import EditForm from "../../components/EditForm";
import { useSelector, useDispatch } from 'react-redux'
import AdminFoodTable from "../../components/AdminFoodTable";



export default function AdminOrderSummary({ showModal, setShowModal, foodInfoEdit, setFoodInfoEdit }) {
    const [showForm, setShowForm] = useState(false)
    const [formDetail, setFormDetail] = useState({
        name: "",
        price: "",
        category: "",
        image: null
    })


    const handleChange = (event) => {
        if (event.target.files) {
            setFormDetail({
                ...formDetail,
                image: event.target.files[0]

            });
        } else {
            setFormDetail({
                ...formDetail,
                [event.target.name]: event.target.value,

            });
        }

        console.log("handle form submit image", event.target.files)


    };

    useEffect(() => {
        getAllFood()
            .then((result) => {
                store.dispatch({ type: 'read_all_food', foods: result })
            });
    }, [])

    const uploadFile = async () => {
        const cloudForm = new FormData();
        cloudForm.append("file", formDetail.image)
        cloudForm.append("upload_preset", "dimsum")

        try {

            let api = `https://api.cloudinary.com/v1_1/dh2ri6dh9/image/upload`
            const data = await fetch(api, {
                method: "POST",
                body: cloudForm
            }).then(res => res.json())
            const result = data.url
            return result

        } catch (err) {
            console.error(err)
        }


    }


    async function handleFormSubmit(e) {
        e.preventDefault()

        const uploadedImageUrl = await uploadFile()

        const formData = {
            ...formDetail,
            image: uploadedImageUrl,
        }

        store.dispatch({ type: 'added_one_item', food_id: formDetail.food_id, name: formDetail.name, price: formDetail.price, image: uploadedImageUrl })
        fetch(`http://localhost:5000/admin/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

    };


    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <AdminFoodTable showModal={showModal} setShowModal={setShowModal} setFoodInfoEdit={setFoodInfoEdit} />
                    </div>
                    <button className="bg-indigo-100 hover:bg-indigo-200 text-black font-bold py-2 px-4 rounded-full uppercase mt-4" onClick={() => setShowForm(!showForm)}>add new item to menu</button>
                    {showForm &&
                        <EditForm handleFormSubmit={handleFormSubmit} formDetail={formDetail} handleChange={handleChange} />
                    }
                </div>
            </div>
        </div>

    )
}