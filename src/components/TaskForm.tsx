import React, {useState, FormEvent} from 'react'
import { addTask, task, toggleAdd, toggleEdit, updateTask } from '../features/taskSlice';
import '../App.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
export enum Mode {
    ADD = 'Add',
    EDIT = 'Edit'

}
type props = {
    mode: Mode;
    initialValue?: task
}
const TaskForm = ({mode, initialValue}: props) => {

    const [formData, setFormData] = useState<task>(initialValue ? initialValue : {id: 0, title:'', description:''});
    const dispatch: AppDispatch = useDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Title:', formData.title);
        console.log('Description:', formData.description);
        if(mode === Mode.EDIT && initialValue){
            dispatch(updateTask({id: initialValue.id, description:formData.description, title: formData.title}))
            dispatch(toggleEdit(0))
        }
        if(mode === Mode.ADD){
            dispatch(addTask({title: formData.title, description: formData.description}))
            dispatch(toggleAdd())
        }
      };
  return (
    <div>
        <form className='task-form' onSubmit={handleSubmit}>
            <div>
                <h1>{mode} Task</h1>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default TaskForm