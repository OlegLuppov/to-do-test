import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../buttons/ButtonTodos'
import { InputDate } from '../inputs/InputDate'
import { InputItem } from '../inputs/InputItem'
import { Label } from '../inputs/labels/LableI'
import { addTodo, changeTitle } from '../../store/sliceTodos'
import './form.less'
import './inputWrapper.less'
import { db } from '../fire_base/firebase'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { TypeListTodos } from '../ListTodos/typeListTodos'

export const FormTodo: React.FC = () => {
  const [valueTitle, setValueTitle] = useState('')
  const [valueDate, setValueDate] = useState('')
  const arrTodos = useAppSelector((state) => state.toDos.arrTodos)

  useEffect(() => {
    if (arrTodos.length === 0) {
      onSnapshot(collection(db, 'todos'), (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as TypeListTodos)
        dispatch(addTodo(data))
      })
    }
  }, [])

  const dispatch = useAppDispatch()

  const changeInputDateHandler = async (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement
    setValueDate(target.value)
  }

  const changeInputTitleHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement
    setValueTitle(target.value)
  }

  const clickButtonHandler = async (e: React.FormEvent<HTMLElement>) => {
    if (valueTitle.length === 0) {
      e.preventDefault()
    }
    if (valueTitle.length >= 3) {
      e.preventDefault()
      dispatch(changeTitle(valueTitle))

      const todo = {
        id: new Date().getMilliseconds(),
        title: valueTitle,
        date: valueDate,
        completed: false,
        classCompletedContent: 'content-todos',
        isPTag: true,
        dateWarning: '',
      }

      dispatch(addTodo([todo, ...arrTodos]))

      // для себя пометка: создаю документ в firestore с ключем valueTitle и передаю туда обьект todo
      await setDoc(doc(db, 'todos', `${valueTitle}`), todo)
      //.........................................

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
