import store from "../store/store";

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

export default function DeleteButton({ item }) {
    return <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteFood(item.food_id)}>
        Delete
    </button>
}