import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addTodo } from '../../store/sliceTodos'
import { db } from '../fire_base/firebase'
import { FormTodo } from '../forms/FormTodo'
import { ListTodos } from '../ListTodos/ListTodos'
import { TypeListTodos } from '../ListTodos/typeListTodos'
import './main.less'
export const Main: React.FC = () => {
  const arrTodos = useAppSelector((state) => state.toDos.arrTodos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (arrTodos.length === 0) {
      onSnapshot(collection(db, 'todos'), (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as TypeListTodos)
        dispatch(addTodo(data))
      })
    }
  }, [])

  return (
    <main>
      <FormTodo />
      <ListTodos todos={arrTodos} />
    </main>
  )
}
