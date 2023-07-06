import AdminReadTotal from "./AdminReadTotal"
import AdminOrderSummary from "./AdminOrderSummary"
import AdminEditModal from "./AdminEditModal";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function AdminContent({ token }) {
    const [showModal, setShowModal] = useState(false);
    const [foodID, setFoodID] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token")
        if (!tokenFromStorage) {
            navigate("/admin")
        }
    }, [])
    return (
        <>
            {token && (<>
                <AdminReadTotal />
                <AdminOrderSummary showModal={showModal} setShowModal={setShowModal} foodID={foodID} setFoodID={setFoodID} />
                {showModal && <AdminEditModal setShowModal={setShowModal} foodId={foodID} />}
            </>)}
        </>

    )
}