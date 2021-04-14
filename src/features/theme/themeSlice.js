import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        darkMode: localStorage.getItem('darkMode') === 'false' ? false : true,
        sideBarOpen: localStorage.getItem('sideBarOpen') === 'false'? false: true
    },
    reducers: {
        toggleDarkMode: (state) => {
            localStorage.setItem('darkMode', !state.darkMode)
            state.darkMode = !state.darkMode
        },
        toggleSideBar: (state) => {
            localStorage.setItem('sideBarOpen', !state.sideBarOpen)
            state.sideBarOpen = !state.sideBarOpen
        }
    },
});


export const { toggleDarkMode, toggleSideBar } = themeSlice.actions;


export const darkMode = state => state.theme.darkMode
export const sideBarOpen = state => state.theme.sideBarOpen

export default themeSlice.reducer;
