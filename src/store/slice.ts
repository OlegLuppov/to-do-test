import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeInitialState } from './typeInitialState'
import { TypeListTodos } from '../components/ListTodos/typeListTodos'

const initialState: TypeInitialState = {
  arrTodos: [],
  title: '',
  updateValue: '',
}

const todosSlice = createSlice({
  name: 'to-do-test',
  initialState,

  reducers: {
    addTodo: (state, action: PayloadAction<TypeListTodos[]>) => {
      state.arrTodos = action.payload
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    updateValue: (state, action: PayloadAction<string>) => {
      state.updateValue = action.payload
    },
    updateTitle: (state, action: PayloadAction<number>) => {
      state.arrTodos.find((todo) => {
        if (todo.id === action.payload) {
          todo.title = state.updateValue
        }
      })
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      state.arrTodos = state.arrTodos.filter((todo) => todo.id !== action.payload)
    },
    complededTodo: (state, action: PayloadAction<number>) => {
      state.arrTodos.find((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed
        }
        if (todo.completed) {
          todo.classCompletedContent = 'content-todos completed-content-todos'
        } else {
          todo.classCompletedContent = 'content-todos '
        }
      })
    },
  },
})

export const { addTodo, changeTitle, removeTodo, complededTodo, updateTitle, updateValue } =
  todosSlice.actions

export default todosSlice.reducer
