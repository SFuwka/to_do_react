import { createSlice } from '@reduxjs/toolkit';
import authApi from './apiCalls';
import { authMe } from './authSlice';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        pending: false,
        loginSuccess: false,
        error: null
    },
    reducers: {
        pending: state => {
            state.pending = true
        },
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

export const { success, failure, clearError, pending } = loginSlice.actions

//selectors
export const loginSuccess = state => state.login.loginSuccess
export const progress = state => state.login.pending
export const error = state => state.login.error

//thunks
export const login = (email, password, rememberMe) => (dispatch) => {
    dispatch(pending())
    authApi.login(email, password, rememberMe).then(res => {
        dispatch(success())
        dispatch(authMe())
    }).catch(err => {
        console.log(err.response.data)
        dispatch(failure(err.response.data))
    })
}


export default loginSlice.reducer;
