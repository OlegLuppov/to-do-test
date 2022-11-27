import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../Button/Button'
import { InputDate } from '../Input/InputDate'
import { InputItem } from '../Input/InputItem'
import { Label } from '../Input/labels/LableI'
import { addTodo } from '../../store/sliceTodos'
import './form.less'
import './inputWrapper.less'
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../fire_base/firebase'
import { Todo } from '../../Types/typeListTodos'

let todos: Todo[] = []
export const FormTodo: React.FC = () => {
  const [valueTitle, setValueTitle] = useState('')
  const [valueDate, setValueDate] = useState('')
  const [labelTitle, setLabelTitle] = useState('ваша задача')
  const [labelDate, setLabelDate] = useState('дата')
  const [labelTitleClass, setLabelTitleClass] = useState('label-item')
  const [labelDateClass, setLabelDateClass] = useState('label-item')
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
    // если value равно 0 в главном input тогда дело не создасться
    if (valueTitle.length === 0) {
      e.preventDefault()
      setLabelTitle('не менне 3 символов')
      setLabelTitleClass('label-title-warrning')
    }

    if (valueDate.length === 0) {
      e.preventDefault()
      setLabelDate('выберите дату')
      setLabelDateClass('label-date-warrning')
    }
    if (valueTitle.length >= 3 && valueDate.length === 0) {
      e.preventDefault()
      setLabelTitle('ваша задача')
      setLabelTitleClass('label-item')
    }

    if (valueTitle.length >= 3 && valueDate.length !== 0) {
      // если value меньше трех символов и не равно 0  в главном input всплывет popup с предупреждением не менее 3 символов,
      // если все ок создаем дело
      e.preventDefault()
      setLabelDate('датa')
      setLabelDateClass('label-item')
      setLabelTitle('ваша задача')
      setLabelTitleClass('label-item')
      // создаем обьект todo со свойствами
      const todoId = new Date().getMilliseconds() + Math.random()
      const todo = {
        id: todoId,
        title: valueTitle,
        date: valueDate,
        completed: false,
        classCompletedContent: 'content-todos',
        isPTag: true,
        isSpanTag: true,
        dateWarning: 'date-todo',
      }

      todos = [todo, ...todos]

      dispatch(addTodo(todos)) // спредим обьект todo в inishialState => arrTodods
      updateDoc(doc(db, 'list', 'myTodos'), {
        // обновляем firestore
        list: todos,
      })
      setValueTitle('') // очищаю value главного input в state
      setValueDate('')
    }
  }

  useEffect(() => {
    onSnapshot(collection(db, 'list'), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      todos = data[0].list as Todo[]
    })
  }, [])

  return (
    <section className="form-wrapper">
      <form>
        <div className="input-wrapper">
          <InputItem
            onChange={changeInputTitleHandler}
            value={valueTitle}
            type="text"
            placeholder="Введите задачу"
          />
          <Label className={labelTitleClass} titleLabel={labelTitle} />
        </div>
        <div className="input-wrapper">
          <InputDate onChange={changeInputDateHandler} valueDate={valueDate} />
          <Label className={labelDateClass} titleLabel={labelDate} />
        </div>
        <Button onClick={clickButtonHandler} name="создать задачу" className="button-create-todo" />
      </form>
    </section>
  )
}
