import React, { useEffect, useState } from 'react'
import { TypeListTodos, TypeTodos } from './typeListTodos'
import { Button } from '../buttons/ButtonTodos'
import { InputCheckBox } from '../inputs/InputCheckbox'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  updateValue,
  complededTodo,
  removeTodo,
  updateTitle,
  changeIsPTag,
  warningDateTodo,
} from '../../store/sliceTodos'
import { InputItem } from '../inputs/InputItem'
import './list.less'

export const ListTodos: React.FC<TypeTodos> = ({ todos }) => {
  const [valueTitle, setValueTitle] = useState('') // value из главного input записываем в state
  const arrTodos = useAppSelector((state) => state.toDos.arrTodos) // получаем массив todos из store

  const dispatch = useAppDispatch()

  // меняем value в store при вводе текста
  const changeInputTitleHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement
    setValueTitle(target.value)
  }

  const changeContentHandler = (todo: TypeListTodos) => {
    setValueTitle(todo.title)
    dispatch(changeIsPTag(todo.id))
  }

  const saveContentHandler = (todo: TypeListTodos) => {
    dispatch(updateValue(valueTitle))
    dispatch(updateTitle(todo.id))
    setValueTitle('')
  }

  useEffect(() => {
    // вызываем метод warningDateTodo при изменеии массива arrTodos
    dispatch(warningDateTodo('warning'))
  }, [arrTodos])

  return (
    <section className="list-todos-wrapper">
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <div className="content-wrapper">
                <InputCheckBox
                  onChange={() => {
                    dispatch(complededTodo(todo.id))
                  }}
                  completed={todo.completed}
                />
                <>
                  {todo.isPTag ? (
                    <p
                      id={`${todo.id}`}
                      className={todo.classCompletedContent}
                      onClick={() => changeContentHandler(todo)}
                    >
                      {todo.title}
                    </p>
                  ) : (
                    <form>
                      <InputItem
                        type="текст"
                        placeholder="редактировать"
                        onChange={changeInputTitleHandler}
                        autoFocus={true}
                        value={valueTitle}
                      />
                      <Button
                        nameButton="сохранить"
                        className="save-button"
                        onClick={() => saveContentHandler(todo)}
                      />
                    </form>
                  )}
                </>
              </div>
              <div className="date-wrapper">
                <span className={todo.dateWarning}>{todo.date}</span>

                <Button
                  onClick={() => dispatch(removeTodo(todo.id))} // вызываем метод removeTodo из store для удаления todo
                  nameButton="удалить"
                  className="button-delete-todo"
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
