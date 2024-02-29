/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getAllTasks, getAllTasksDeleted, searchOneTask, searchOneTaskDeleted } from '../../redux/taskSlice'
import styles from './SearchTask.module.css'
import RefreshIcon from '@mui/icons-material/Refresh'

interface Props {
  status: boolean
}

export const SearchTask: React.FC<Props> = ({ status }) => {
  const searchTasks = useAppSelector(state => state.Task.searchTasks)
  const searchTasksDeleted = useAppSelector(state => state.Task.searchDeletedTasks)

  const [taskName, setTaskName] = useState('')
  const dispatch = useAppDispatch()

  const searchByCoincidence = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const taskString = event.target.value.toLowerCase()
    if (taskString.length === 0) {
      if (status) {
        await dispatch(getAllTasks())
      } else {
        await dispatch(getAllTasksDeleted())
      }
    } else {
      if (status) {
        await dispatch(searchOneTask(taskString, searchTasks))
      } else {
        await dispatch(searchOneTaskDeleted(taskString, searchTasksDeleted))
      }
    }
    setTaskName(taskString)
  }

  const handleReset = async (): Promise<void> => {
    try {
      if (status) {
        await dispatch(getAllTasks())
      } else {
        await dispatch(getAllTasksDeleted())
      }
      setTaskName('')
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  return (
    <>
      <div className={styles.search}>
        <input
          className={styles.input}
          placeholder='🔍Search your task...'
          onChange={searchByCoincidence}
          value={taskName}
        />
        <button onClick={handleReset}><RefreshIcon /></button>
      </div>
    </>
  )
}
