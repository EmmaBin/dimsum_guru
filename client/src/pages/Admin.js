import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AdminReadTotal from "./AdminReadTotal";
import AdminOrderSummary from "./AdminOrderSummary";
import AdminEditModal from "./AdminEditModal";

export default function Admin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await signInWithEmailAndPassword(auth, "test@test.com", "dimsum")
        console.log(response)
    }

    
    const [showModal, setShowModal] = useState(false);
    const [foodID, setFoodID] = useState(null);
    return (
        <>

            <form onSubmit={handleLogin}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-1/2 border-black border-2 rounded-md p-1"
                />
                <label htmlFor="password" className="block mt-3 text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-1/2 border-black border-2 rounded-md p-1"
                />
                <button type="submit" className="mt-3 block w-1/2 border-black border-2 rounded-md bg-blue-500 text-white py-1">Log In</button>
            </form>
            <br></br>
            <AdminReadTotal />
            <AdminOrderSummary showModal={showModal} setShowModal={setShowModal} foodID={foodID} setFoodID={setFoodID} />
            {showModal && <AdminEditModal setShowModal={setShowModal} foodId={foodID} />}
        </>
    )

}