import { createSlice } from '@reduxjs/toolkit';
import searchApi from './apiCalls';



const initialState = {
    searchResult: null
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResult: (state, action) => {
            state.searchResult = action.payload
        },
        reset: () => initialState
    },
});


export const { setSearchResult, reset } = searchSlice.actions;

//selectors
export const searchResult = state => state.search.searchResult
//thunks
export const search = (context, searchText) => dispatch => {
    searchApi.search(context, searchText).then(res => {
        dispatch(setSearchResult(res.data))
    })
}

export default searchSlice.reducer;
