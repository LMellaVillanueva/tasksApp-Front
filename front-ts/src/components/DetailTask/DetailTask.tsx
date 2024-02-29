import axios from 'axios'
import { useEffect } from 'react'
import styles from './DetailTask.module.css'

interface Props {
  id: number
  name: string
  description: string
  detail: number[]
  setDetail: React.Dispatch<React.SetStateAction<number[]>>
}

export const DetailTask: React.FC<Props> = ({ id, name, description, detail, setDetail }) => {
  useEffect(() => {
    const fetchTask = async (): Promise<void> => {
      try {
        const endpoint = '/tasks'
        await axios.get(`${endpoint}/${id}`)
      } catch (error) {
        if (error instanceof Error) throw Error(error.message)
      }
    }
    fetchTask().catch((error) => {
      if (error instanceof Error) throw Error(error.message)
    })
  }, [])

  if (!detail.includes(id)) return null

  return (
        <>
            <div className={styles.modal}>
              <div className={styles.detail}>
                <button onClick={() => { setDetail([]) }}>X</button>
                <h1>Name: {name}</h1>
                <div className={styles.br}></div>
                <h2>Description: {description}</h2>
                <div className={styles.br}></div>
                <h2>Id: {id}</h2>
                </div>
            </div>
        </>
  )
}
