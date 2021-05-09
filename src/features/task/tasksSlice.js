import { createSlice } from '@reduxjs/toolkit';
import { CREATE, DELETE } from '../actions';
import taskApi from './apiCalls';


export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        pending: {
            create: false,
            delete: [],
            tasksLoading: false
        }
    },
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
        }
    }
})

export const { pending, stopPending, setTasks, addTaskToBegining, deleteTask } = taskSlice.actions

//selectors
export const isFetching = state => state.task.pending

//thunks
export const createTask = (projectId, task) => dispatch => {
    dispatch(pending(CREATE))
    console.log(projectId,task)
    taskApi.newTask(projectId,task).then(res => {
        console.log(res)
    })
}


export default taskSlice.reducer;
