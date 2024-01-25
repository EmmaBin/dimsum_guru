export function cartReducer(state = [], action) {
    switch (action.type) {
        case 'fetch_cart':
            console.log('debug1', state)
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

// const actions = {
//     type: {
//         fetch_cart: {
//             cart: [/* Array of food items */]
//         },
//         added: {
//             food_id: /* Food item ID */,
//             name: /* Food item name */,
//             price: /* Food item price */,
//             image: /* Food item image */
//         },
//         deleted: {
//             food_id: /* Food item ID to delete */
//         },
//         paid: {},
//         calculated_total_price: {
//         cart:[array of food]
//}
//     }
// };
