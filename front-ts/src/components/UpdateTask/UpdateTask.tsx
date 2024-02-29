/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios'
import { useState } from 'react'
import { useAppDispatch } from '../../redux/store'
import { getAllTasks } from '../../redux/taskSlice'
import styles from './UpdateTask.module.css'
import { validations } from './validations'

interface Props {
  id: number
  update: number[]
  setUpdate: React.Dispatch<React.SetStateAction<number[]>>
  nameTask: string
  descriptionTask: string
}

export const UpdateTask: React.FC<Props> = ({ id, update, setUpdate, nameTask, descriptionTask }) => {
  const dispatch = useAppDispatch()

  const [infoTask, setInfoTask] = useState({
    name: nameTask,
    description: descriptionTask
  })

  const [errors, setErrors] = useState({
    name: '',
    description: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInfoTask({
      ...infoTask,
      [event.target.name]: event.target.value
    })
    setErrors(validations(infoTask))
  }

  const { name, description } = infoTask

  const updateTask = async (): Promise<void> => {
    try {
      const endpoint = '/tasks'
      const { data } = await axios.put(`${endpoint}/${id}`, { name, description })
      if (data.status === true) {
        await dispatch(getAllTasks())
        setErrors({ name: '', description: '' })
        setUpdate([0])
      }
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    try {
      event.preventDefault()
      if (errors.name.length > 0 || errors.description.length > 0) {
        window.alert('Complete the task!')
      } else await updateTask()
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  if (!update.includes(id)) return null

  return (
    <>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
        <button className={styles.x} onClick={() => { setUpdate([]) }}>X</button>
          <label className={styles.label}>Name: </label>
          <input
            className={styles.input}
            type="text"
            name='name'
            value={infoTask.name}
            onChange={handleChange}
            />
          {(errors.name !== '') && <p className={styles.errors}>{errors.name}</p>}
          <div className={styles.br}></div>
          <label className={styles.label}>Description: </label>
          <input
            className={styles.input}
            type="text"
            name='description'
            value={infoTask.description}
            onChange={handleChange}
          />
          {(errors.description.length > 0) && <p className={styles.errors}>{errors.description}</p>}

          <button type='submit' className={styles.button}>Update</button>
        </form>
      </div>
    </>
  )
}
