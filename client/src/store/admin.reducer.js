export default function adminReducer(state = [], action) {
    switch (action.type) {
        case 'read_all_food':
            console.log('debug for admin', action.foods)
            return [...action.foods];
        case 'delete_from_menu': {
            const newState = [...state].filter(food => food.food_id !== action.food_id)
            return newState
        };
        case 'added_one_item':
            return [...state, { food_id: action.food_id, name: action.name, price: +action.price, image: action.image }]

        default:
            return state
    }

}