import { createSlice } from '@reduxjs/toolkit';
import { patternCreator } from '../../utils/patternCreator';
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
    const pattern = patternCreator(searchText)
    searchApi.search(context, pattern).then(res => {
        dispatch(setSearchResult(res.data))
    })
}

export default searchSlice.reducer;
