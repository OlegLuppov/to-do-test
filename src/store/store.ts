import { configureStore } from '@reduxjs/toolkit'
import toDoReduser from './slice'

const store = configureStore({
  reducer: {
    toDos: toDoReduser,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
