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
  const arrTodos = useAppSelector((state) => state.toDos.arrTodos) // получаем arrTodos из store => initialState
  const dispatch = useAppDispatch()

  useEffect(() => {
    // при любом изьенении страницы получаю из firestore массив totdos и передаю в initialState => arrTodos
    onSnapshot(collection(db, 'list'), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      dispatch(addTodo(data[0].list as TypeListTodos[]))
    })
    //.........................................................................
  }, [])

  return (
    <main>
      <FormTodo />
      <ListTodos todos={arrTodos} />
    </main>
  )
}
