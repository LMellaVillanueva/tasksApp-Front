/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch } from '../../redux/store'
import { type ListOfTasks } from '../../types'
import { getAllTasks, getAllTasksDeleted } from '../../redux/taskSlice'
import { useEffect, useState } from 'react'
import styles from './TasksDeleted.module.css'
import { Link } from 'react-router-dom'
import { Confirmation } from './Confirmation/Confirmation'
import axios from 'axios'
import { SearchTask } from '../SearchTask/SearchTask'
import HomeIcon from '@mui/icons-material/Home'
import { Task } from '../Task/Task'

interface Props {
  tasksDeleted: ListOfTasks
}

export const TasksDeleted: React.FC<Props> = ({ tasksDeleted }) => {
  const [confirmation, setConfirmation] = useState<number[]>([])
  const dispatch = useAppDispatch()
  const status = false

  useEffect(() => {
    const fetchTasksDeleted = async (): Promise<void> => {
      try {
        await dispatch(getAllTasksDeleted())
      } catch (error) {
        if (error instanceof Error) throw Error(error.message)
      }
    }
    fetchTasksDeleted().catch((error) => {
      if (error instanceof Error) throw Error(error.message)
    })
  }, [])

  const handleReturn = async (id: number): Promise<void> => {
    try {
      const endpoint = 'taskStatus'
      const { data } = await axios.put(`${endpoint}/${id}`, { status: true })
      if (data.status === true) {
        await dispatch(getAllTasksDeleted())
        await dispatch(getAllTasks())
        setConfirmation([0])
      }
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  return (
    <>
      <div className={styles.allContainer}>
        <div className={styles.tasksContainer}>
          <div className={styles.navigation}>
            <SearchTask status={status} />
            <Link to='/' className={styles.back}>
              <button className={styles.backButton}><HomeIcon /></button>
            </Link>
          </div>
          <div className={styles.tasks}>

            {(tasksDeleted.length === 0) && <h2 className={styles.noTasks}>No tasks deleted...</h2>}

            {tasksDeleted?.map(task => (
              <div key={task.id} className={styles.oneTask}>
                <div className={styles.title}>
                  {/* <h3>Task N°: {task.id}</h3>
                <div className={styles.taskContent}>
                  <span className={styles.info}>Name: {task.name}</span>
                  <span className={styles.info}> Description: {task.description}</span>
                </div> */}
                  <Task id={task.id} name={task.name} description={task.description} status={false}/>
                </div>
                <div className={styles.buttons}>
                  <button onClick={() => { setConfirmation([task.id]) }}>Delete</button>
                  <Confirmation id={task.id} confirmation={confirmation} setConfirmation={setConfirmation} />
                  <button onClick={() => { void handleReturn(task.id) }}>Return</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
