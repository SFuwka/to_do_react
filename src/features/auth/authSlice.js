import { createSlice } from '@reduxjs/toolkit';
import authApi from './apiCalls';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isFetching: false,
        isAuthorized: false,
        userId: null,
        error: null
    },
    reducers: {
        pending: state => {
            state.isFetching = true
        },
        success: (state, action) => {
            state.isFetching = false
            state.userId = action.payload
            state.isAuthorized = true
        },
        failure: (state, action) => {
            state.isFetching = false
            state.isAuthorized = false
            state.error = action.payload
        },
        notAuthorized: state => {
            state.isAuthorized = false
            state.isFetching = false
        },
        clearError: state => {
            state.error = null
        }
    }
})

export const { success, failure, clearError, pending, notAuthorized } = authSlice.actions

//selectors
export const isFetching = state => state.auth.isFetching
export const isAuthorized = state => state.auth.isAuthorized

//thunks
export const authMe = () => dispatch => {
    dispatch(pending())
    authApi.authMe().then(res => {
        if (res.user) {
            return dispatch(success(res.user))
        }
        return dispatch(notAuthorized())
    }).catch(err => {
        if (err) {
            dispatch(err.response.data)
            console.log(err)
        }
    })
}

export const logout = () => dispatch => {
    dispatch(pending())
    authApi.logout().then(() => {
        dispatch(notAuthorized())
    })
}

export default authSlice.reducer