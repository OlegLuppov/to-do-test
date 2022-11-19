import React, { useEffect, useState } from 'react'
import { TypeTodos } from './typeListTodos'
import { Button } from '../buttons/ButtonTodos'
import { InputCheckBox } from '../inputs/InputCheckbox'
import './list.less'
import { useAppDispatch } from '../../store/hooks'
import { updateValue, complededTodo, removeTodo, updateTitle } from '../../store/slice'
import { currentDate } from '../constants/date'

export const ListTodos: React.FC<TypeTodos> = ({ todos }) => {
  const [valueTitle, setValueTitle] = useState('')
  const [isPTag, setPTag] = useState(true)

  const dispatch = useAppDispatch()

  const changeInputTitleHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement
    setValueTitle(target.value)
  }

  const changePtoInput = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('p')) {
      setPTag(false)
    }
  }

  useEffect(() => {
    console.log(currentDate)
  }, [])

  return (
    <section className="list-todos-wrapper">
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <InputCheckBox
                onChange={() => dispatch(complededTodo(todo.id))}
                completed={todo.completed}
              />
              <>
                {isPTag ? (
                  <p className={todo.classCompletedContent} onClick={changePtoInput}>
                    {todo.title}
                  </p>
                ) : (
                  <form>
                    <input type="text" autoFocus onChange={changeInputTitleHandler} />
                    <Button
                      nameButton="сохранить"
                      className="save-button"
                      onClick={(e: React.FormEvent<HTMLElement>) => {
                        e.preventDefault()
                        setPTag(true)
                        dispatch(updateValue(valueTitle))
                        dispatch(updateTitle(todo.id))
                      }}
                    />
                  </form>
                )}
              </>
              <span>{todo.date}</span>

              <Button
                onClick={() => dispatch(removeTodo(todo.id))}
                nameButton="удалить"
                className="button-delete-todo"
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
