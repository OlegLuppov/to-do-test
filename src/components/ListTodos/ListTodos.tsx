import React, { useEffect, useState } from 'react'
import { Todo, Todos } from '../../Types/typeListTodos'
import { Button } from '../Button/Button'
import { InputCheckBox } from '../Input/InputCheckbox'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeTodo, warningDateTodo, updateTodo } from '../../store/sliceTodos'
import { InputItem } from '../Input/InputItem'
import './list.less'
import { ButtonDeleted } from '../Button/buttonDeleted'
import { Label } from '../Input/labels/LableI'
import { ButtonEditDate } from '../Button/bottonEditDate'
import { ButtonEditContent } from '../Button/ButtonEditContent'

export const ListTodos: React.FC<Todos> = ({ todos }) => {
  const [valueTitle, setValueTitle] = useState('') // value из главного input записываем в state
  const [valueDate, setValueDate] = useState('')
  const arrTodos = useAppSelector((state) => state.toDos.arrTodos) // получаем массив todos из store

  const dispatch = useAppDispatch()

  // меняем value в store при вводе текста
  const changeInputTitleHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement
    setValueTitle(target.value)
  }
  const changeInputDateHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement
    setValueDate(target.value)
  }
  const changeInputFileHandler = (e: React.ChangeEvent<HTMLElement>, todo: Todo) => {
    const target = e.target as HTMLInputElement
    if (target.value !== '') {
      dispatch(updateTodo({ id: todo.id + 4, file: target.value }))
    }
  }

  const changeContentHandler = (todo: Todo) => {
    setValueTitle(todo.title)
    dispatch(updateTodo({ id: todo.id }))
  }

  const changeDateHandler = (todo: Todo) => {
    setValueDate(todo.date)
    dispatch(updateTodo({ id: todo.id + 3, date: valueDate }))
  }

  const saveContentHandler = (todo: Todo) => {
    dispatch(updateTodo({ id: todo.id + 2, title: valueTitle }))
    setValueTitle('')
  }

  const saveDateHandler = (todo: Todo) => {
    dispatch(updateTodo({ id: todo.id + 3, date: valueDate }))
    setValueDate('')
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
              <div className="wrapper-item-content">
                <div className="content-wrapper">
                  <InputCheckBox
                    onChange={() => {
                      dispatch(updateTodo({ id: todo.id + 1 }))
                    }}
                    completed={todo.completed}
                  />
                  <>
                    {todo.isPTag ? (
                      <>
                        <ButtonEditContent
                          className="content-edit"
                          onClick={() => changeContentHandler(todo)}
                          name="button-edit"
                        />
                        <p id={`${todo.id}`} className={todo.classCompletedContent}>
                          {todo.title}
                        </p>
                      </>
                    ) : (
                      <form className="wrapper-form-save">
                        <div className="input-wrapper">
                          <InputItem
                            type="text"
                            placeholder="редактировать"
                            onChange={changeInputTitleHandler}
                            autoFocus={true}
                            value={valueTitle}
                          />
                          <Label className="label-item" titleLabel="изменить задачу" />
                        </div>
                        <Button
                          name="сохранить"
                          className="save-button"
                          onClick={() => saveContentHandler(todo)}
                        />
                      </form>
                    )}
                  </>
                </div>
                <ButtonDeleted name="delete" onClick={() => dispatch(removeTodo(todo.id))} />
              </div>
              <div className="date-wrapper">
                <>
                  {todo.isSpanTag ? (
                    <div className="wrapper-edit-date">
                      <ButtonEditDate
                        className="date-edit"
                        onClick={() => changeDateHandler(todo)}
                        name="button-edit"
                      />
                      <span className={todo.dateWarning}>{todo.date}</span>
                    </div>
                  ) : (
                    <form className="wrapper-form-save">
                      <div className="input-wrapper">
                        <InputItem
                          type="date"
                          placeholder="редактировать"
                          onChange={changeInputDateHandler}
                          autoFocus={true}
                          value={valueDate}
                        />
                        <Label titleLabel="изменить дату" className="label-item" />
                      </div>
                      <Button
                        name="сохранить"
                        className="save-button"
                        onClick={() => saveDateHandler(todo)}
                      />
                    </form>
                  )}
                </>
                <div className="file-wrapper">
                  <input
                    type="file"
                    id="file"
                    className="file"
                    multiple
                    onChange={(e) => {
                      changeInputFileHandler(e, todo)
                    }}
                  />

                  <label htmlFor="file" className="label-file">
                    {todo.file}
                  </label>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
