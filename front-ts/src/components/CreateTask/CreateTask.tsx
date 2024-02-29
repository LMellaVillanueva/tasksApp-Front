/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios'
import { useState } from 'react'
import { useAppDispatch } from '../../redux/store'
import { getAllTasks } from '../../redux/taskSlice'
import styles from './CreateTask.module.css'
import { validations } from './validations'

export const CreateTask = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [task, setTask] = useState({
    name: '',
    description: '',
    status: true
  })

  const [errors, setErrors] = useState({
    name: '',
    description: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    })
    setErrors(validations(task))
  }

  const { name, description, status } = task

  const createTask = async (): Promise<void> => {
    try {
      const endponint = '/tasks'
      const { data } = await axios.post(endponint, { name, description, status })
      if (data.status === true) {
        await dispatch(getAllTasks())
        setTask({ name: '', description: '', status: true })
        setErrors({ name: '', description: '' })
      }
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    try {
      event.preventDefault()
      if (errors.name.length > 0 || errors.description.length > 0) {
        window.alert('You must complete the task!')
      } else await createTask()
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>

            <label className={styles.labelName}>Name: </label>
            <input
              className={styles.inputName}
              type="text"
              name='name'
              value={task.name}
              onChange={handleChange}
            />
            {(errors.name !== '') && <p className={styles.errors}>Error: {errors.name}</p>}

            <label className={styles.labelDes}>Description: </label>
            <input
              className={styles.inputDes}
              type="text"
              name='description'
              value={task.description}
              onChange={handleChange}
              />
              {(errors.description.length > 0) && <p className={styles.errors}>Error: {errors.description}</p>}

          <button className={styles.create} type='submit'>Create Task</button>
        </form>
      </div>
    </>
  )
}
