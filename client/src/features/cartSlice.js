import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    carts: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            state.carts = [...state.carts, action.payload.item]
        },
        decreaseCount: (state, action) => {
            state.carts = state.carts.map(cart => {
                if (cart.id === action.payload.id && action.payload.quantity > 1) {
                    cart.quantity--;
                }
                return cart;
            })
        },
        increaseCount: (state, action) => {
            state.carts = state.carts.map(cart => {
                if (cart.id === action.payload.id) {
                    cart.quantity++;
                }
                return cart;
            })
        },
        removeFromCart: (state, action) => {
            state.carts = state.carts.filter(cart => cart.id !== action.payload.id)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setItems, addToCart, decreaseCount, increaseCount, removeFromCart } = cartSlice.actions

export default cartSlice.reducer