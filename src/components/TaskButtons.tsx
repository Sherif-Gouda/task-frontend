import React from 'react'
import { AppDispatch } from '../app/store'
import { useDispatch } from 'react-redux'
import { fetchTasks, toggleAdd } from '../features/taskSlice'

const TaskButtons = () => {
    const dispatch: AppDispatch = useDispatch()
    return (
        <div className="button-panel">
          <button className="add-task-button" onClick={()=>(dispatch(toggleAdd()))}>Add Task</button>
          <button className="all-tasks-button" onClick={()=>dispatch(fetchTasks())}>All Tasks</button>
        </div>
      )
}

export default TaskButtons