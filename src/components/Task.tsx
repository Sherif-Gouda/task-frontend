import React, { useState } from 'react'
import { deleteTask, toggleEdit, task} from '../features/taskSlice'
import '../App.css'
import TaskForm, { Mode } from './TaskForm'
import { AppDispatch, RootState } from '../app/store'
import { useDispatch, useSelector } from 'react-redux'

const Task = ({id, title, description}: task) => {
const {editVisible} = useSelector((state: RootState)=> state.tasks)
  const dispatch: AppDispatch = useDispatch()
  return (
   <div className='Task-Container'>
     <div className='Task'>
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        <div className='Buttons'>
            <button className='btn btn-edit' onClick={()=>dispatch(toggleEdit(id))}>Edit</button>
            <button className='btn btn-del' onClick={()=>dispatch(deleteTask(id))}>Delete</button>
        </div>
     </div>
     {editVisible && editVisible === id && <TaskForm mode={Mode.EDIT} initialValue={{id, title, description}}/>}
   </div>
  )
}

export default Task