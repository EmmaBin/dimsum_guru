import React, { useEffect, useState } from 'react';

export default function AdminReadTotal() {
    const [TotalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/admin/total")
            .then(res => res.json())
            .then(result => {
                setTotalRevenue(result.total_revenue);
            });
    }, []);

    return (
        <>
            TOTAL REVENUE: ${TotalRevenue}
        </>
    )
}