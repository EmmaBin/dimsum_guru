export function cartReducer(state = [], action) {
    switch (action.type) {
        case 'fetch_cart':
            return [...action.cart];
        case 'added':
            return [...state, { food_id: action.food_id, name: action.name, price: action.price, image: action.image }]
        case 'deleted':
            const indexNumber = state.findIndex(x => x.food_id === action.food_id)
            const newState = [...state];
            newState.splice(indexNumber, 1);
            return newState;
        case 'paid':
            return [];
    
        default:
            return state
    }
}

.