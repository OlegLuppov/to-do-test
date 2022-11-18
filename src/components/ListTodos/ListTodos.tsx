import React from 'react'
import { TypeTodos } from './typeListTodos'
import { Button } from '../buttons/ButtonTodos'
import { InputCheckBox } from '../inputs/InputCheckbox'
import './list.less'

export const ListTodos: React.FC<TypeTodos> = ({ todos, className }) => {
  return (
    <div className="list-todos-wrapper">
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <InputCheckBox />
              <div className={className}>
                <p>{todo.title}</p>
                <span>{todo.date}</span>
              </div>
              <Button
                onClick={() => console.log('')}
                nameButton="удалить"
                className="button-delete-todo"
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
