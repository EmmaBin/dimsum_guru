import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AdminReadTotal from "./AdminReadTotal";
import AdminOrderSummary from "./AdminOrderSummary";

export default function Admin() {
    const handleLogin = async () => {
        const response = await signInWithEmailAndPassword(auth, "test@test.com", "dimsum")
        console.log(response)
    }
    return (
        <>

            <button onClick={handleLogin}>Login</button>
            <br></br>
            <AdminReadTotal />
            <AdminOrderSummary />
        </>
    )

}