import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../components/ListTodos/typeListTodos'
import { currentDate } from '../components/constants/date'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../components/fire_base/firebase'

const initialState = {
  arrTodos: [] as Todo[],
  title: '',
}

const todosSlice = createSlice({
  name: 'to-do-test',
  initialState,

  reducers: {
    // метод добавления todo
    addTodo: (state, action: PayloadAction<Todo[]>) => {
      state.arrTodos = action.payload // устанавливаем массив преданый в action.payload
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload // меняем title на action.payload
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      state.arrTodos = state.arrTodos.filter((todo) => todo.id !== action.payload)
      updateDoc(doc(db, 'list', 'myTodos'), {
        // обновляем firestore
        list: state.arrTodos,
      })
    },

    // здесь сравниваем текущую дату со свойством date в обьекте todo и меняем его свойства если date < текущей
    warningDateTodo: (state, action: PayloadAction<string>) => {
      state.arrTodos.map((todo) => {
        if (currentDate > todo.date) {
          todo.dateWarning = action.payload
          todo.date = 'срок истек'
          updateDoc(doc(db, 'list', 'myTodos'), {
            // обновляем firestore
            list: state.arrTodos,
          })
        }
      })
    },
    updateTodo: (state, action: PayloadAction<Partial<Todo>>) => {
      const props = action.payload
      state.arrTodos.find((todo) => {
        if (todo.id === props.id) {
          todo.isPTag = !todo.isPTag // меняем с true на false
        }
        if (todo.id + 1 === props.id) {
          todo.completed = !todo.completed // меняем с true на false свойство completed у обьекта todo
        }
        if (todo.completed) {
          todo.classCompletedContent = 'content-todos completed-content-todos' // добавляем класс если true
        } else {
          todo.classCompletedContent = 'content-todos ' // старый класс если false
        }
        if (`${todo.date} update title` === props.date) {
          todo.title = props.title!
          todo.isPTag = !todo.isPTag
        }
      })
      updateDoc(doc(db, 'list', 'myTodos'), {
        // обновляем firestore
        list: state.arrTodos,
      })
    },
  },
})

export const { addTodo, changeTitle, removeTodo, warningDateTodo, updateTodo } = todosSlice.actions

export default todosSlice.reducer
