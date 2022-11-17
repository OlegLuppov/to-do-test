import React from 'react'
import { Button } from '../buttons/button'
import { InputTitle } from '../inputs/InputTitle'
import { Label } from '../inputs/labels/LableI'
import './form.less'
import './inputWrapper.less'

export const FormTodo: React.FC = () => {
  return (
    <div className="form-wrapper">
      <form>
        <div className="input-wrapper">
          <Label titleLabel="ваше дело" />
          <InputTitle type="text" placeholder="Введите дело"></InputTitle>
        </div>
        <div className="input-wrapper">
          <Label titleLabel="дата окончания" />
          <InputTitle type="Date" placeholder="" />
        </div>
        <Button nameButton="создать дело" className="button-create" />
      </form>
    </div>
  )
}
