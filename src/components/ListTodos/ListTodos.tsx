import React, { useEffect, useState } from 'react'
import { TypeTodos } from './typeListTodos'
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
  const [valueTitle, setValueTitle] = useState('')
  const arrTodos = useAppSelector((state) => state.toDos.arrTodos)

  const dispatch = useAppDispatch()

  const changeInputTitleHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement
    setValueTitle(target.value)
  }

  useEffect(() => {
    dispatch(warningDateTodo('warning'))
  }, [arrTodos])

  return (
    <section className="list-todos-wrapper">
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <InputCheckBox
                onChange={() => {
                  dispatch(complededTodo(todo.id))
                }}
                completed={todo.completed}
              />
              <>
                {todo.isPTag ? (
                  <p
                    className={todo.classCompletedContent}
                    onClick={(e: React.MouseEvent) => {
                      const target = e.target as HTMLElement
                      if (target.closest('.content-todos')) {
                        dispatch(changeIsPTag(todo.id))
                      }
                    }}
                    defaultValue=""
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
                    />
                    <Button
                      nameButton="сохранить"
                      className="save-button"
                      onClick={(e: React.FormEvent<HTMLElement>) => {
                        e.preventDefault()
                        dispatch(updateValue(valueTitle))
                        dispatch(updateTitle(todo.title))
                      }}
                    />
                  </form>
                )}
              </>
              <div className="date-wrapper">
                <span className={todo.dateWarning}>{todo.date}</span>

                <Button
                  onClick={() => dispatch(removeTodo(todo.id))}
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
