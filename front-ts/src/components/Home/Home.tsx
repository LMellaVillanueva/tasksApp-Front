/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios'
import { type ListOfTasks } from '../../types'
import { CreateTask } from '../CreateTask/CreateTask'
import { Task } from '../Task/Task'
import { useAppDispatch } from '../../redux/store'
import { getAllTasks, orderAllTasks } from '../../redux/taskSlice'
import { UpdateTask } from '../UpdateTask/UpdateTask'
import { useState } from 'react'
import { DetailTask } from '../DetailTask/DetailTask'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import { SearchTask } from '../SearchTask/SearchTask'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  tasks: ListOfTasks
}

export const Home: React.FC<Props> = ({ tasks }) => {
  const [update, setUpdate] = useState<number[]>([])
  const [detail, setDetail] = useState<number[]>([])
  const dispatch = useAppDispatch()
  const status = true

  const handleLogicDelete = async (id: number): Promise<void> => {
    try {
      const endpoint = '/taskStatus'
      const { data } = await axios.put(`${endpoint}/${id}`, { status: false })
      if (data.status === true) await dispatch(getAllTasks())
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  const hasTasks = tasks.some(task => task.status)

  const handleOrder = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    try {
      if (event.target.value === 'A') {
        dispatch(orderAllTasks('A', tasks))
      } else if (event.target.value === 'D') {
        dispatch(orderAllTasks('D', tasks))
      }
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  return (
    <>
      <div>
        <h1 className={styles.title}>Task App</h1>
        <div className={styles.allContainer}>
          <div className={styles.createTask}>
            <CreateTask />
          </div>
          <div className={styles.tasksContainer}>
            <div className={styles.navigation}>
              <select className={styles.order} onChange={handleOrder}>
                <option value="">Order: </option>
                <option value="A">Ascending</option>
                <option value="D">Descending</option>
              </select>
              <SearchTask status={status} />
            <Link to='trash' className={styles.delete}>
              <button className={styles.buttonDelete}><DeleteIcon/></button>
            </Link>
            </div>
            <div className={styles.tasks}>
              {!hasTasks && <h2 className={styles.noTasks}>No tasks yet...</h2>}

              {tasks.map(task => (
                task.status && (
                  <div key={task.id} className={styles.taskAndButtons}>
                    <div className={styles.oneTask}>
                      <Task
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        description={task.description}
                      />
                    </div>
                    <div className={styles.buttons}>
                      <button onClick={() => { setDetail([task.id]) }}>Detail</button>
                      {detail.includes(task.id) && (
                        <DetailTask
                          id={task.id}
                          name={task.name}
                          description={task.description}
                          detail={detail}
                          setDetail={setDetail}
                        />
                      )}
                      <button onClick={() => { setUpdate([task.id]) }}>Update Task</button>
                      <UpdateTask
                        id={task.id}
                        update={update}
                        setUpdate={setUpdate}
                        nameTask={task.name}
                        descriptionTask={task.description}
                      />
                      <button onClick={async () => { await handleLogicDelete(task.id) }}>Delete Task</button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
