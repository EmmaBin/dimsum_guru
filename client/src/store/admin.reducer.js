export default function adminReducer(state = [], action) {
    switch (action.type) {
        case 'read_all_food':
            console.log('debug for admin', action.foods)
            return [...action.foods];
        case 'delete_from_menu': {
            const newState = [...state].filter(food => food.food_id !== action.food_id)
            return newState
        };
        default:
            return state
    }

}