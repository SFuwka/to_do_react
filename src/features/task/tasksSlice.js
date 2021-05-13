import { createSlice } from '@reduxjs/toolkit';
import { CREATE, DELETE, EDIT, TASKS_LOADING } from '../actions';
import taskApi from './apiCalls';

const initialState = {
    tasks: [],
    pending: {
        create: false,
        tasksLoading: false,
        delete: [],
        edit: [],
    },
    isFetched: false,
    editMode: [],
    error: null
}


export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        pending: (state, action) => {
            if (action.payload.action === DELETE || action.payload.action === EDIT) {
                state.pending[action.payload.action] = [...state.pending[action.payload.action], action.payload.id]
                return
            }
            state.pending[action.payload.action] = true
        },
        stopPending: (state, action) => {
            if (action.payload.action === DELETE || action.payload.action === EDIT) {
                state.pending[action.payload.action] = [...state.pending[action.payload.action].filter(id => id !== action.payload.id)]
                return
            }
            state.pending[action.payload.action] = false
        },
        firstLoadComplete: state => {
            state.isFetched = true
        },
        setTasks: (state, action) => {
            state.tasks = [...state.tasks, ...action.payload]
        },
        turnEditModeOn: (state, action) => {
            state.editMode = [...state.editMode, action.payload]
        },
        turnEditModeOff: (state, action) => {
            console.log(action.payload)
            state.editMode = [...state.editMode.filter(id => id !== action.payload)]
        },
        addTaskToBegining: (state, action) => {
            state.tasks = [action.payload, ...state.tasks]
        },
        updateTask: (state, action) => {
            let isFinded = false
            state.tasks = state.tasks.map(task => {
                if (!isFinded && task._id === action.payload._id) {
                    isFinded = true
                    return action.payload
                }
                return task
            })

        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload)
        },
        reset: () => initialState
    }
})

export const { pending, stopPending, setTasks, addTaskToBegining, turnEditModeOn, turnEditModeOff,
    deleteTask, updateTask, reset, firstLoadComplete } = taskSlice.actions

//selectors
export const isFetching = state => state.task.pending
export const tasks = state => state.task.tasks
export const error = state => state.task.error
export const isFetched = state => state.task.isFetched
export const taskEditMode = state => state.task.editMode

//thunks
export const createTask = (projectId, task) => dispatch => {
    dispatch(pending({ action: CREATE }))
    taskApi.newTask(projectId, task).then(res => {
        dispatch(addTaskToBegining(res.task))
        dispatch(stopPending({ action: CREATE }))
    })
}

export const getTasks = (projectId) => dispatch => {
    dispatch(pending({ action: TASKS_LOADING }))
    taskApi.getTasks(projectId).then(res => {
        dispatch(firstLoadComplete())
        if (res.data.tasks) {
            dispatch(setTasks(res.data.tasks))
            dispatch(stopPending({ action: TASKS_LOADING }))
        } else {
            dispatch(stopPending({ action: TASKS_LOADING }))
        }
    })
}

export const editTask = (projectId, taskId, task) => dispatch => {
    dispatch(pending({ action: EDIT, id: taskId }))
    taskApi.editTask(projectId, taskId, task).then(res => {
        if (res.data.task) {
            dispatch(updateTask(res.data.task))
            dispatch(stopPending({ action: EDIT, id: taskId }))
            dispatch(turnEditModeOff(taskId))
        }
    })
}

export const removeTask = (projectId, taskId) => dispatch => {
    dispatch(pending({ action: DELETE, id: taskId }))
    taskApi.deleteTask(projectId, taskId).then(res => {
        console.log(res)
        dispatch(deleteTask(taskId))
        dispatch(stopPending({ action: DELETE, id: taskId }))
    })
}

export default taskSlice.reducer;
