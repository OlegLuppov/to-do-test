import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../buttons/ButtonTodos'
import { InputDate } from '../inputs/InputDate'
import { InputItem } from '../inputs/InputItem'
import { Label } from '../inputs/labels/LableI'
import { addTodo, changeTitle } from '../../store/sliceTodos'
import './form.less'
import './inputWrapper.less'

export const FormTodo: React.FC = () => {
  const [valueTitle, setValueTitle] = useState('')
  const [valueDate, setValueDate] = useState('')
  const arrTodos = useAppSelector((state) => state.toDos.arrTodos)

  const dispatch = useAppDispatch()

  const changeInputDateHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement
    setValueDate(target.value)
  }

  const changeInputTitleHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement
    setValueTitle(target.value)
  }

  const clickButtonHandler = (e: React.FormEvent<HTMLElement>) => {
    if (valueTitle.length === 0) {
      e.preventDefault()
    }
    if (valueTitle.length >= 3) {
      e.preventDefault()
      dispatch(changeTitle(valueTitle))

      const newArrTodos = {
        id: new Date().getMilliseconds(),
        title: valueTitle,
        date: valueDate,
        completed: false,
        classCompletedContent: 'content-todos',
        isPTag: true,
        dateWarning: '',
      }
      dispatch(addTodo([newArrTodos, ...arrTodos]))
      setValueTitle('')
    }
  }

  return (
    <section className="form-wrapper">
      <form>
        <div className="input-wrapper">
          <Label titleLabel="ваше дело" />
          <InputItem
            onChange={changeInputTitleHandler}
            value={valueTitle}
            type="text"
            placeholder="Введите дело"
          ></InputItem>
        </div>
        <div className="input-wrapper">
          <Label titleLabel="дата окончания" />
          <InputDate onChange={changeInputDateHandler} valueDate={valueDate} />
        </div>
        <Button
          onClick={clickButtonHandler}
          nameButton="создать дело"
          className="button-create-todo"
        />
      </form>
    </section>
  )
}
