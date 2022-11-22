import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeInitialState } from './typeInitialState'
import { TypeListTodos } from '../components/ListTodos/typeListTodos'
import { currentDate } from '../components/constants/date'
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
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
    // метод добавления todo
    addTodo: (state, action: PayloadAction<TypeListTodos[]>) => {
      state.arrTodos = action.payload // устанавливаем массив преданый в action.payload
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload // меняем title на action.payload
    },
    changeIsPTag: (state, action: PayloadAction<number>) => {
      state.arrTodos.find((todo) => {
        if (todo.id === action.payload) {
          todo.isPTag = !todo.isPTag // меняем с true на false
        }
      })
    },
    updateValue: (state, action: PayloadAction<string>) => {
      state.updateValue = action.payload // обнавляем значение на action.payload
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      state.arrTodos.find((todo) => {
        if (todo.title === action.payload) {
          todo.title = state.updateValue // меняем title на initialState => updateTitle
          todo.isPTag = !todo.isPTag
        }
        deleteDoc(doc(db, 'todos', `${action.payload}`)) // удаляю todo со старым title
        setDoc(doc(db, 'todos', `${todo.title}`), {
          // создаю новый todo в firestore
          id: new Date().getMilliseconds(),
          title: todo.title,
          date: todo.date,
          completed: todo.completed,
          classCompletedContent: todo.classCompletedContent,
          isPTag: todo.isPTag,
          dateWarning: todo.dateWarning,
        })
      })
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      state.arrTodos = state.arrTodos.filter((todo) => {
        if (todo.id === action.payload) {
          deleteDoc(doc(db, 'todos', `${todo.title}`)) // удаляю из filestore todo с title = todo.id
        }
      })
    },

    // если дело ввыполнено зачеркиваем его и ставим checkbox в true
    complededTodo: (state, action: PayloadAction<number>) => {
      state.arrTodos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed // меняем с true на false свойство completed у обьекта todo
        }
        if (todo.completed) {
          todo.classCompletedContent = 'content-todos completed-content-todos' // добавляем класс если true
        } else {
          todo.classCompletedContent = 'content-todos ' // старый класс если false
        }
        //  для себя: обновляем данные completed и classCompletedContent в firebase
        updateDoc(doc(db, 'todos', `${todo.title}`), {
          completed: todo.completed,
          classCompletedContent: todo.classCompletedContent,
        })
        // ............................................
      })
    },

    // здесь сравниваем текущую дату со свойством date в обьекте todo и меняем его свойства если date < текущей
    warningDateTodo: (state, action: PayloadAction<string>) => {
      state.arrTodos.map((todo) => {
        if (currentDate > todo.date) {
          updateDoc(doc(db, 'todos', `${todo.title}`), {
            dateWarning: action.payload,
            date: 'время истекло',
          })
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
