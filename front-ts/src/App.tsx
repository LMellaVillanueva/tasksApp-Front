import { Home } from './components/Home/Home'
import { TasksDeleted } from './components/TasksDeleted/TasksDeleted'
import { useAppDispatch, useAppSelector } from './redux/store'
import { getAllTasks } from './redux/taskSlice'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

const App: React.FC = () => {
  const allTasks = useAppSelector((state) => state.Task.tasks)
  const allTasksDeleted = useAppSelector((state) => state.Task.deletedTasks)
  const dispatch = useAppDispatch()
  useEffect(() => {
    // Promise<void> significa que la promesa no necesariamente retorna un valor en específico
    const fetchTasks = async (): Promise<void> => {
      try {
        await dispatch(getAllTasks())
      } catch (error) {
        if (error instanceof Error) throw Error(error.message)
      }
    }
    fetchTasks().catch((error) => {
      if (error instanceof Error) throw Error(error.message)
    })
  }, [])

  return (
    <>
    <Routes>
      <Route path='/' element={<Home tasks={allTasks} />}/>
      <Route path='/trash' element={<TasksDeleted tasksDeleted={allTasksDeleted} />} />
    </Routes>
    </>
  )
}

export default App
