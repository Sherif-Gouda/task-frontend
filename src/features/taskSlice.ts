import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type task = {
    id: number;
    title: string;
    description: string;
} 
type InitialState = {
  loading: boolean;
  taskData: Array<task>;
  error: string | undefined
  addVisible: boolean;
  editVisible: null | number

}
const initialState: InitialState = {
  loading: false,
  taskData: [],
  error: undefined,
  addVisible: false,
  editVisible: null
}

const config = {
  headers: {
    'Content-Type': 'application/json'
  },
};
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async ()=>{
  const res = await axios.get('http://localhost:3001/tasks')
  return res.data
})
export const addTask = createAsyncThunk('tasks/addTask', async (data: Partial<task>)=>{
  const res = await axios.post('http://localhost:3001/tasks', data, config)
  return res.data
})
export const updateTask = createAsyncThunk('tasks/updateTask', async (newData: task)=>{
  const res = await axios.put(`http://localhost:3001/tasks/${newData.id}`, newData, config)
  return res.data
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number)=>{
  const res = await axios.delete(`http://localhost:3001/tasks/${id}`)
  return id
})

export const searchTask = createAsyncThunk('tasks/searchTask', async (key: string)=>{
  const res = await axios.get(`http://localhost:3001/tasks/${key}`)
  return res.data
})
export const taskSlice = createSlice({
   name: "tasks",
   initialState,
   reducers:{
    toggleEdit: (state, action: PayloadAction<number>)=>{
      if(state.editVisible){
        state.editVisible = null
      }
      else{
        state.editVisible = action.payload
      }
    },

    toggleAdd: (state)=>{
      state.addVisible = !state.addVisible
    }
   },
   extraReducers: (builder)=>{
    builder.addCase(fetchTasks.pending, (state)=>{state.loading = true})
    builder.addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Array<task>>) => {
      state.loading = false
      state.taskData = action.payload
    })
    builder.addCase(addTask.fulfilled, (state, action: PayloadAction<task>)=>{state.taskData.push(action.payload)})
    builder.addCase(updateTask.fulfilled, (state, action: PayloadAction<task>)=>{
      const idx = state.taskData.findIndex(task => task.id === action.payload.id)
      console.log(idx, action.payload.id)
      state.taskData[idx] = action.payload
    })
    builder.addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>)=>{
      const idx = state.taskData.findIndex(task => task.id === action.payload)
      state.taskData.splice(idx, 1)
    })

    builder.addCase(searchTask.fulfilled, (state, action: PayloadAction<Array<task>>)=>{state.taskData = action.payload})
   }

})

export const {toggleEdit, toggleAdd} = taskSlice.actions
export default taskSlice.reducer