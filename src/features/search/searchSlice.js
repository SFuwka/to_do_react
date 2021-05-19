import { createSlice } from '@reduxjs/toolkit';
import { patternCreator } from '../../utils/patternCreator';



const initialState = {
    searchResult: null
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResult: (state, action) => {
            state.searchResult = action.payload
        }
    },
});


export const { setSearchResult } = searchSlice.actions;

//selectors

//thunks
export const search = (context, searchText) => dispatch => {
    const pattern = patternCreator(searchText)
    // searchApi.search(context, pattern).then(res => {
    //     console.log(res)
    // })
}

export default searchSlice.reducer;
