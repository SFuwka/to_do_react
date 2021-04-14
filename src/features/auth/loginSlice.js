import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        pending: false,
        loginSuccess: false,
        error: null
    },
    reducers: {
        success: state => {
            state.pending = false
            state.loginSuccess = true
        },
        failure: (state, action) => {
            state.pending = false
            state.loginSuccess = false
            state.error = action.payload
        },
        clearError: state => {
            state.error = null
        }
    }
})

export const { success, failure, clearError } = loginSlice.actions

//selectors
export const loginSuccess = state => state.login.loginSuccess
export const pending = state => state.login.pending

//thunks
export const login = (email, password, rememberMe) => (dispatch) => {
    debugger
    dispatch(success())
    console.log(email,password,rememberMe)
}

export default loginSlice.reducer;
