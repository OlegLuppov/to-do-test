import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeInitialState } from './typeInitialState'
import { TypeListTodos } from '../components/ListTodos/typeListTodos'

const initialState: TypeInitialState = {
  arrTodos: [],
  completed: false,
}

const todosSlice = createSlice({
  name: 'to-do-test',
  initialState,

  reducers: {
    addTodo: (state, action: PayloadAction<TypeListTodos[]>) => {
      state.arrTodos = action.payload
    },
  },
})

export const { addTodo } = todosSlice.actions

export default todosSlice.reducer
