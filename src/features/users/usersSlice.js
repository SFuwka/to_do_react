import { createSlice } from '@reduxjs/toolkit';
import { ACTIVE_USER_FETCH, MY_PROFILE_FETCH, USERS_FETCH } from '../actions';
import usersApi from './apiCalls';

const initialState = {
    pending: {
        myProfileFetching: false,
        activeUserFetching: false,
        usersFetching: false
    },
    totalUsersCount: 0,
    authUser: null,
    activeUser: null,
    users: [],
    err: null,
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        pending: (state, action) => {
            state.pending[action.payload.action] = true
        },
        stopPending: (state, action) => {
            state.pending[action.payload.action] = false
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        },
        setActiveUser: (state, action) => {
            state.activeUser = action.payload
        },
        clearActiveUser: state => { state.activeUser = null },
        setUsers: (state, action) => {
            state.users = [...state.users, ...action.payload]
        },
        setTotalUsersCount: (state, action) => {
            state.totalUsersCount = action.payload
        },
        reset: () => initialState
    },
});


export const { pending, stopPending, setAuthUser, setActiveUser, clearActiveUser, setUsers, setTotalUsersCount, reset } = usersSlice.actions;

//selectors
export const authUser = state => state.user.authUser
export const isFetching = state => state.user.pending
export const users = state => state.user.users
export const activeUser = state => state.user.activeUser

//thunks
export const getMyProfile = () => dispatch => {
    dispatch(pending({ action: MY_PROFILE_FETCH }))
    usersApi.getMyProfile().then(res => {
        dispatch(setAuthUser(res))
        dispatch(stopPending({ action: MY_PROFILE_FETCH }))
    }).catch(err => {
        console.log(err.response.data)
    })
}

export const getUsers = () => dispatch => {
    dispatch(pending({ action: USERS_FETCH }))
    usersApi.getUsers().then(res => {
        console.log(res.profiles)
        dispatch(setTotalUsersCount(res.totalCount))
        dispatch(setUsers(res.profiles))
        dispatch(stopPending({ action: USERS_FETCH }))
    })
}

export const getUser = (userId) => dispatch => {
    dispatch(pending({ action: ACTIVE_USER_FETCH }))
    usersApi.getUser(userId).then(res => {
        dispatch(setActiveUser(res))
        dispatch(stopPending({ action: ACTIVE_USER_FETCH }))
    }).catch(err => {
        console.log(err)
    })
}

export default usersSlice.reducer;
