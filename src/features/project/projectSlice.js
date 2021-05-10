import { createSelector, createSlice } from '@reduxjs/toolkit';
import { CREATE, DELETE, PROJECTS_LOADING } from '../actions';
import projectApi from './apiCalls';

const initialState = {
    pending: {
        create: false,
        projectsLoading: false,
        delete: [], //contains project id's that currently in delete progress
    },
    activeProject: null,
    projectsPage: 0,
    projects: [],
    error: null,
    isFetched: false,
    projectCreated: false
}


export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        pending: (state, action) => {
            if (action.payload.action === DELETE) {
                state.pending[action.payload.action] = [...state.pending[action.payload.action], action.payload.id]
                return
            }
            state.pending[action.payload.action] = true
        },
        stopPending: (state, action) => {
            if (action.payload.action === DELETE) {
                state.pending[action.payload.action] = [...state.pending[action.payload.action].filter(id => id !== action.payload.id)]
                return
            }
            state.pending[action.payload.action] = false
        },
        firstLoadComplete: state => {
            state.isFetched = true
        },
        setProjects: (state, action) => {
            state.projects = [...state.projects, ...action.payload]
        },
        setActiveProject: (state, action) => {
            state.activeProject = action.payload
        },
        addProjectToBegining: (state, action) => {
            state.projects = [action.payload, ...state.projects]
            state.projectCreated = true
        },
        projectCreatedStatusToDefault: state => {
            state.projectCreated = false
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(project => project._id !== action.payload)
        },
        failure: (state, action) => {
            state.error = action.payload
        },
        clearError: state => {
            state.error = null
        },
        reset: () => initialState
    }
})

export const { setProjects, addProjectToBegining, failure, clearError,
    pending, setActiveProject, stopPending, firstLoadComplete, projectCreatedStatusToDefault,
    deleteProject, reset } = projectSlice.actions

//selectors
export const projects = state => state.project.projects
export const error = state => state.project.error
export const getProjectById = projectId => {
    return createSelector(projects, (projects) => {
        return projects.find(project => project._id === projectId)
    })
}
export const activeProject = state => state.project.activeProject
export const isFetching = state => state.project.pending
export const isFetched = state => state.project.isFetched
export const projectCreated = state => state.project.projectCreated


//thunks
export const createProject = project => dispatch => {
    dispatch(pending({ action: CREATE }))
    console.log(project)
    projectApi.newProject(project).then((res) => {
        dispatch(addProjectToBegining(res.project))
        dispatch(stopPending({ action: CREATE }))
    }).catch(error => {
        dispatch(failure(error.response.data))
    })
}

export const removeProject = projectId => dispatch => {
    dispatch(pending({ action: DELETE, id: projectId }))
    projectApi.deleteProject(projectId).then(res => {
        dispatch(deleteProject(projectId))
        dispatch(stopPending({ action: DELETE, id: projectId }))
    })

}

export const getProjects = (userId, page, count) => dispatch => {
    dispatch(pending({ action: PROJECTS_LOADING }))
    projectApi.getProjects(userId, page, count).then(res => {
        dispatch(firstLoadComplete())
        if (res.status !== 204) {
            dispatch(setProjects(res.data.projects))
            dispatch(stopPending({ action: PROJECTS_LOADING }))
        } else {
            dispatch(stopPending({ action: PROJECTS_LOADING }))
        }
    })
}

export const getProject = projectId => dispatch => {
    dispatch(pending({ action: PROJECTS_LOADING }))
    projectApi.getProject(projectId).then(res => {
        dispatch(stopPending({ action: PROJECTS_LOADING }))
        dispatch(setActiveProject(res.data.project))
    }).catch(err => {
        dispatch(failure(err.response.data))
        dispatch(stopPending({ action: PROJECTS_LOADING }))
    })
}


export default projectSlice.reducer;
