import React, {useEffect} from 'react'
export default function AdminReadTotal() {
    let TotalRevenue

    useEffect(() => {
        fetch("http://localhost:5000/admin/total")
        .then(res => res.json())
        .then(result => console.log(result))
    }, [])



    return (
        <>
            TOTAL REVENUE:{TotalRevenue}
        </>
    )
}