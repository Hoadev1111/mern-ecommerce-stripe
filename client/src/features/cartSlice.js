import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     items: [],
//     carts: [],
// }

const getCartInitialState = () => {
    const storeState = localStorage.getItem('cartState');
    if (storeState) {
        return JSON.parse(storeState);
    } else {
        return {
            items: [],
            carts: [],
        }
    }
}




export const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartInitialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            state.carts = [...state.carts, action.payload.item]
            localStorage.setItem('cartState', JSON.stringify(state));
            localStorage.setItem('cartBeforeLogout', JSON.stringify(state.carts))
        },
        decreaseCount: (state, action) => {
            state.carts = state.carts.map(cart => {
                if (cart.id === action.payload.id && action.payload.quantity > 1) {
                    cart.quantity--;
                }
                return cart;
            })
            localStorage.setItem('cartState', JSON.stringify(state));
        },
        increaseCount: (state, action) => {
            state.carts = state.carts.map(cart => {
                if (cart.id === action.payload.id) {
                    cart.quantity++;
                }
                return cart;
            })
            localStorage.setItem('cartState', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            state.carts = state.carts.filter(cart => cart.id !== action.payload.id)
            localStorage.setItem('cartState', JSON.stringify(state));
        },
        clearCart: (state) => {
            state.carts = [];
            localStorage.setItem('cartState', JSON.stringify(state));
        }
    },
})

// Action creators are generated for each case reducer function
export const { setItems, addToCart, decreaseCount, increaseCount, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer