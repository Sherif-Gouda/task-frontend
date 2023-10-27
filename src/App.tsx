import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './components/Task';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { fetchTasks } from './features/taskSlice';
import TaskForm, { Mode } from './components/TaskForm';
import SearchBar from './components/SearchBar';
import TaskButtons from './components/TaskButtons';

function App() {
  const dispatch: AppDispatch = useDispatch()
  const tasks = useSelector((state: RootState)=> state.tasks)
  useEffect(() => {
    dispatch(fetchTasks())
  }, [])
  
  return (
    <div className="Task-List">
      <SearchBar />
      <TaskButtons />
      {tasks.addVisible && <div style={{width: '50%'}}>
        <TaskForm mode={Mode.ADD} />
      </div>}
      {tasks.loading && <p>Loading...</p>}
      {tasks.taskData.map(task=>{
        return(
          <Task {...task} key={task.id}/>
        )
      })}
    </div>
  );
}

export default App;
