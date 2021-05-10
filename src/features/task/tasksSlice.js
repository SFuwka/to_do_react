import { createSlice } from '@reduxjs/toolkit';
import { CREATE, DELETE, TASKS_LOADING } from '../actions';
import taskApi from './apiCalls';

const initialState = {
    tasks: [],
    pending: {
        create: false,
        delete: [],
        tasksLoading: false
    }
}


export const taskSlice = createSlice({
    name: 'task',
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
        setTasks: (state, action) => {
            state.tasks = [...state.tasks, ...action.payload]
        },
        addTaskToBegining: (state, action) => {
            state.tasks = [action.payload, ...state.tasks]
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload)
        },
        reset: () => initialState
    }
})

export const { pending, stopPending, setTasks, addTaskToBegining, deleteTask, reset } = taskSlice.actions

//selectors
export const isFetching = state => state.task.pending
export const tasks = state => state.task.tasks

//thunks
export const createTask = (projectId, task) => dispatch => {
    dispatch(pending(CREATE))
    // console.log(projectId, task)
    taskApi.newTask(projectId, task).then(res => {
        dispatch(addTaskToBegining(res.task))
        dispatch(stopPending(CREATE))
    })
}

export const getTasks = (projectId) => dispatch => {
    dispatch(pending(TASKS_LOADING))
    taskApi.getTasks(projectId).then(res => {
        if (res.data.tasks) {
            dispatch(setTasks(res.data.tasks))
            dispatch(stopPending(TASKS_LOADING))
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
