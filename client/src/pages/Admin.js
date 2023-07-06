import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AdminReadTotal from "./AdminReadTotal";
import AdminOrderSummary from "./AdminOrderSummary";
import AdminEditModal from "./AdminEditModal";

export default function Admin({ setToken }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('')
    const handleLogin = async (event) => {
        event.preventDefault();
        if (email !== 'test@test.com' || password !== 'dimsum') {
            setErr('Wrong Log In Information!')
            setEmail('')
            setPassword('')
            return
        }
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log(response)
        localStorage.setItem("token", response.user.accessToken)
        setToken(response.user.accessToken)

        navigate('/admin-account')
    }



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
                    onFocus={(e) => setErr('')}
                    className="mt-1 block w-1/2 border-black border-2 rounded-md p-1"
                />
                <label htmlFor="password" className="block mt-3 text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={(e) => setErr('')}
                    className="mt-1 block w-1/2 border-black border-2 rounded-md p-1"
                />
                <button type="submit" className="mt-3 block w-1/2 border-black border-2 rounded-md bg-blue-500 text-white py-1">Log In</button>
            </form>

            <br></br>
            {err && <div>{err}</div>}

        </>
    )

}