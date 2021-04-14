import { createSlice } from '@reduxjs/toolkit';


export const signUpSlice = createSlice({
    name: 'signUp',
    initialState: {
        pending: false,
        signUpSuccess: false,
        error: null
    },
    reducers: {
        success: state => {
            state.pending = false
            state.signUpSuccess = true
        },
        failure: (state, action) => {
            state.pending = false
            state.signUpSuccess = false
            state.error = action.payload
        },
        clearError: state => {
            state.error = null
        }
    }
})

export const { success, failure, clearError } = loginSlice.actions

//selectors
export const loginSuccess = state => state.signUp.loginSuccess

//thunks