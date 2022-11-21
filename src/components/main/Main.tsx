import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { FormTodo } from '../forms/FormTodo'
import { ListTodos } from '../ListTodos/ListTodos'
import './main.less'
export const Main: React.FC = () => {
  const arrTodos = useAppSelector((state) => state.toDos.arrTodos)

  return (
    <main>
      <FormTodo />
      <ListTodos todos={arrTodos} />
    </main>
  )
}
