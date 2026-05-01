import { createSlice } from "@reduxjs/toolkit";

// Create a initial state
const initialState = {
    status: false,
    userData: null 
}

// Create a slice (reducers)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.status = false
            state.userData = null
        }
    }
})

// Exporting individual 'reducer' (method) for being used directly in components
export const {login, logout} = authSlice.actions

// Exporting all the reducers to the store
export default authSlice.reducer