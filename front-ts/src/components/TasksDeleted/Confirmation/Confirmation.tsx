/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios'
import { useAppDispatch } from '../../../redux/store'
import { getAllTasksDeleted } from '../../../redux/taskSlice'
import styles from './Confirmation.module.css'

interface Props {
  id: number
  confirmation: number[]
  setConfirmation: React.Dispatch<React.SetStateAction<number[]>>
}

export const Confirmation: React.FC<Props> = ({ id, confirmation, setConfirmation }) => {
  const dispatch = useAppDispatch()

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const endpoint = 'tasks'
      const { data } = await axios.delete(`${endpoint}/${id}`)
      if (data.status === true) {
        await dispatch(getAllTasksDeleted())
        setConfirmation([0])
      }
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  if (!confirmation.includes(id)) return null

  return (
    <>
        <div className={styles.modal}>
          <div className={styles.container}>
            <h2>You want to delete the task permanently?</h2>
            <button onClick={() => { setConfirmation([0]) }}>Cancel</button>
            <button onClick={async () => { await handleDelete(id) }}>Delete</button>
            </div>
        </div>
    </>
  )
}
