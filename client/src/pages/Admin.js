import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AdminReadTotal from "./AdminReadTotal";
import AdminOrderSummary from "./AdminOrderSummary";
import AdminEditModal from "./AdminEditModal";

export default function Admin() {
    const handleLogin = async () => {
        const response = await signInWithEmailAndPassword(auth, "test@test.com", "dimsum")
        console.log(response)
    }
    const [showModal, setShowModal] = useState(false);
    const [foodID, setFoodID] = useState(null);
    return (
        <>

            <button onClick={handleLogin}>Login</button>
            <br></br>
            <AdminReadTotal />
            <AdminOrderSummary showModal={showModal} setShowModal={setShowModal} foodID={foodID} setFoodID={setFoodID} />
            {showModal && <AdminEditModal setShowModal={setShowModal} foodId={foodID} />}
        </>
    )

}