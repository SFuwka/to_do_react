import { createSlice } from '@reduxjs/toolkit';
import { MY_PROFILE_FETCH } from '../actions';
import usersApi from './apiCalls';

export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        pending: {
            myProfileFetching: false,
            activeUserFetching: false,
        },
        authUser: null,
        activeUser: {},
        users: [],
    },
    reducers: {
        pending: (state, action) => {
            state.pending[action.payload.action] = true
        },
        stopPending: (state, action) => {
            state.pending[action.payload.action] = false
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        }
    },
});


export const { pending, stopPending, setAuthUser } = usersSlice.actions;

//selectors
export const authUser = state => state.user.authUser
export const isFetching = state => state.user.pending

//thunks
export const getMyProfile = () => dispatch => {
    dispatch(pending({ action: MY_PROFILE_FETCH }))
    usersApi.getMyProfile().then(res => {
        dispatch(setAuthUser(res))
        dispatch(stopPending({ action: MY_PROFILE_FETCH }))
    })
}

export default usersSlice.reducer;
