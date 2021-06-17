import { createSlice } from '@reduxjs/toolkit';
import authApi from './apiCalls';


export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        pending: false,
        error: null,
        emailSended: false,
        passwordChanged: false
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
        },
        setEmailSendedTrue: state => {
            state.emailSended = true
        },
        setEmailSendedFalse: state => {
            state.emailSended = false
        },
        setPasswordChanged: (state, action) => {
            state.passwordChanged = action.payload
        }
    }
})

export const { success, failure, clearError, pending, setEmailSendedFalse, setEmailSendedTrue, setPasswordChanged } = forgotPasswordSlice.actions

//selectors
export const progress = state => state.forgotPassword.pending
export const error = state => state.forgotPassword.error
export const emailSended = state => state.forgotPassword.emailSended
export const passwordChanged = state => state.forgotPassword.passwordChanged

//thunks
export const forgotPasswordHandler = (email) => (dispatch) => {
    dispatch(pending())
    authApi.forgotPassword(email).then(res => {
        dispatch(success())
        dispatch(setEmailSendedTrue())
    }).catch(err => {
        console.log(err.response.data)
        dispatch(failure(err.response.data))
        dispatch(setEmailSendedFalse())
    })
}

export const resetPassword = (password, resetCode) => (dispatch) => {
    dispatch(pending())
    authApi.resetPassword(password, resetCode).then(res => {
        dispatch(success())
        dispatch(setPasswordChanged(true))
    }).catch(err => {
        console.log(err.response.data)
        dispatch(failure(err.response.data))
    })
}


export default forgotPasswordSlice.reducer;
