import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeInitialState } from './typeInitialState'
import { TypeListTodos } from '../components/ListTodos/typeListTodos'
import { currentDate } from '../components/constants/date'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../components/fire_base/firebase'

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
    changeIsPTag: (state, action: PayloadAction<number>) => {
      state.arrTodos.find((todo) => {
        if (todo.id === action.payload) {
          todo.isPTag = !todo.isPTag
        }
      })
    },
    updateValue: (state, action: PayloadAction<string>) => {
      state.updateValue = action.payload
    },
    updateTitle: (state, action: PayloadAction<number>) => {
      state.arrTodos.find((todo) => {
        if (todo.id === action.payload) {
          todo.title = state.updateValue
          todo.isPTag = !todo.isPTag
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
        //  для себя: обновляем данные completed и classCompletedContent в firebase
        updateDoc(doc(db, 'todos', `${todo.title}`), {
          completed: todo.completed,
          classCompletedContent: todo.classCompletedContent,
        })
        // ............................................
      })
    },
    warningDateTodo: (state, action: PayloadAction<string>) => {
      state.arrTodos.map((todo) => {
        if (currentDate > todo.date) {
          todo.dateWarning = action.payload
          todo.date = 'время истекло'
        }
      })
    },
  },
})

export const {
  addTodo,
  changeTitle,
  removeTodo,
  complededTodo,
  updateTitle,
  updateValue,
  changeIsPTag,
  warningDateTodo,
} = todosSlice.actions

export default todosSlice.reducer
