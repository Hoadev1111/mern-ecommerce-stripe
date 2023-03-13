import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     isLogin: false
// }


const getInitialState = () => {
    const storedState = localStorage.getItem('authState');
    if (storedState) {
        return JSON.parse(storedState);
    } else {
        return { isLogin: false };
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        login: (state) => {
            state.isLogin = true;
            localStorage.setItem('authState', JSON.stringify(state));
        },
        logout: (state) => {
            state.isLogin = false;
            localStorage.setItem('authState', JSON.stringify(state));
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer;