import { type Tasks as TasksType } from '../../types'
import styles from './Task.module.css'

type Props = TasksType

export const Task: React.FC<Props> = ({ id, name, description }) => {
  return (
        <div className={styles.task}>
            <h2 className={styles.number}>Task N° {id}:</h2>
            <div className={styles.border}></div>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.border}></div>
            <p className={styles.des}>{description}</p>
            <div className={styles.border}></div>
            <br />
            <div></div>
        </div>
  )
}
