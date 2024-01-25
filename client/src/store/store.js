import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './cart.reducer'
import adminReducer from './admin.reducer'


export default configureStore({
    reducer: {
        cart: cartReducer,
        admin: adminReducer
    }
})