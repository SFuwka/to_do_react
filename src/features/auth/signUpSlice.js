import { createSlice } from '@reduxjs/toolkit';
import authApi from './apiCalls';


export const signUpSlice = createSlice({
    name: 'signUp',
    initialState: {
        pending: false,
        signUpSuccess: false,
        error: null,
    },
    reducers: {
        pending: state => {
            state.pending = true
        },
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

export const { success, failure, clearError, pending } = signUpSlice.actions

//selectors
export const signUpSuccess = state => state.signUp.signUpSuccess
export const progress = state => state.signUp.pending
export const error = state => state.signUp.error

//thunks
export const signUp = (name, surname, alias, email, password) => (dispatch) => {
    dispatch(pending())
    authApi.signUp(name, surname, alias, email, password).then(res => {
        dispatch(success())
    }).catch(err => {
        dispatch(failure(err.response.data))
    })
}

export default signUpSlice.reducer