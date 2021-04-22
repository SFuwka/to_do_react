import { createSlice } from '@reduxjs/toolkit';


export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        pending: false,
        projects: [],
        activeProject: null,
        error: null
    },
    reducers: {
        pending: state => {
            state.pending = true
        },
        stopPending: state => {
            state.pending = false
        },
        setProjects: (state, action) => {
            state.projects = [...state, ...action.payload]
            state.pending = false
        },
        createProject: (state, action) => {
            state.projects = [...state, action.payload]
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(project => project._id !== action.payload)
        },
        failure: (state, action) => {
            state.error = action.payload
            state.pending = false
        },
        clearError: state => {
            state.error = null
        }
    }
})

export const { setProjects, failure, clearError, pending } = projectSlice.actions

//selectors
export const projects = state => state.project.projects
export const activeProject = state => state.project.activeProject


//thunks



export default projectSlice.reducer;
