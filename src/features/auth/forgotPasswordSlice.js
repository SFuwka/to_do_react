import { createSlice } from '@reduxjs/toolkit';
import authApi from './apiCalls';


export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        pending: false,
        error: null
    },
    reducers: {
        pending: state => {
            state.pending = true
        },
        success: state => {
            state.pending = false
        },
        failure: (state, action) => {
            state.pending = false
            state.error = action.payload
        },
        clearError: state => {
            state.error = null
        }
    }
})

export const { success, failure, clearError, pending } = forgotPasswordSlice.actions

//selectors
export const progress = state => state.forgotPassword.pending
export const error = state => state.forgotPassword.error

//thunks
export const forgotPasswordHandler = (email) => (dispatch) => {
    dispatch(pending())
    authApi.forgotPassword(email).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err.response.data)
        dispatch(failure(err.response.data))
    })
}


export default forgotPasswordSlice.reducer;
