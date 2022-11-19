import React from 'react'
import { TypeInputCheckbox } from './typeInput'

export const InputCheckBox: React.FC<TypeInputCheckbox> = ({ completed, onChange }) => {
  return (
    <input onChange={onChange} className="input-completed" type="checkbox" checked={completed} />
  )
}
