import { type ListOfTasks } from '../types'
import { createSlice } from '@reduxjs/toolkit'
import { type AppDispatch } from './store'
import axios from 'axios'

interface Tasks {
  tasks: ListOfTasks
  deletedTasks: ListOfTasks
  searchTasks: ListOfTasks
  searchDeletedTasks: ListOfTasks
}

const initialState: Tasks = {
  tasks: [],
  deletedTasks: [],
  searchTasks: [],
  searchDeletedTasks: []
}

export const TaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTasks: (state, action) => {
      state.tasks = [...action.payload]
      state.searchTasks = [...action.payload]
    },
    getTasksDeleted: (state, action) => {
      state.deletedTasks = [...action.payload]
      state.searchDeletedTasks = [...action.payload]
    },
    orderTasks: (state, action) => {
      state.tasks = [...action.payload]
    },
    searchTask: (state, action) => {
      state.tasks = [...action.payload]
    },
    searchTaskDeleted: (state, action) => {
      state.deletedTasks = [...action.payload]
    }
  }
})

export const getAllTasks = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get('/tasks')
    if (data.status === true) {
      dispatch(getTasks(data.allTasks))
    } else dispatch(getTasks([]))
  } catch (error) {
    if (error instanceof Error) throw Error(error.message)
  }
}

export const getAllTasksDeleted = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get('/taskStatus')
    if (data.status === true) {
      dispatch(getTasksDeleted(data.tasksDeleted))
    } else dispatch(getTasksDeleted([]))
  } catch (error) {
    if (error instanceof Error) throw Error(error.message)
  }
}

export const orderAllTasks = (order: string, state: ListOfTasks) => (dispatch: AppDispatch) => {
  try {
    if (order === 'A') dispatch(orderTasks([...state].sort((a, b) => a.id - b.id)))
    else if (order === 'D') dispatch(orderTasks([...state].sort((a, b) => b.id - a.id)))
  } catch (error) {
    if (error instanceof Error) throw Error(error.message)
  }
}

export const searchOneTask = (task: string, state: ListOfTasks) => async (dispatch: AppDispatch) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch(searchTask(state.filter((taskFound => {
      return taskFound.name.toLowerCase().startsWith(task)
    }))))
  } catch (error) {

  }
}

export const searchOneTaskDeleted = (task: string, state: ListOfTasks) => async (dispatch: AppDispatch) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch(searchTaskDeleted(state.filter((taskFound => {
      return taskFound.name.toLowerCase().startsWith(task)
    }))))
  } catch (error) {

  }
}

export default TaskSlice.reducer
export const { getTasks, getTasksDeleted, orderTasks, searchTask, searchTaskDeleted } = TaskSlice.actions
