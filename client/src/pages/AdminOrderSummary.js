import React, { useEffect, useState } from "react";

const getAllFood = async () => {
    try {
        const response = await fetch("http://localhost:5000/foods");
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        console.error(err.message)
    }
}

export default function AdminOrderSummary() {
    const [foods, setFoods] = useState([])
    useEffect(() => {
        getAllFood()
            .then((result) => setFoods(result))
    }, [])
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
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              1
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">Jone Doe</td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              jonne62@gmail.com
                                    </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              jonne62@gmail.com
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a className="text-green-500 hover:text-green-700" href="#">
                                Edit
                              </a>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a className="text-red-500 hover:text-red-700" href="#">
                                Delete
                              </a>
                            </td>
                          </tr>


 
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
        
    )
}