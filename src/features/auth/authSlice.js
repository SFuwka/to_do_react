import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        pending: false,
        authSuccess: false,
        user: null,
        error: null
    },
    reducers: {
        success: (state, action) => {
            state.pending = false
            state.user = action.payload
            state.authSuccess = true
        },
        failure: (state, action) => {
            state.pending = false
            state.authSuccess = false
            state.error = action.payload
        },
        clearError: state => {
            state.error = null
        }
    }
})

export const { success, failure, clearError } = loginSlice.actions

//selectors
export const authSuccess = state => state.login.loginSuccess

//thunks