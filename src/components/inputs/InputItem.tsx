import React from 'react'
import './input.less'
import { TypeInputTitle } from './typeInput'

export const InputItem: React.FC<TypeInputTitle> = ({
  type,
  placeholder,
  valueTitle,
  onChange,
}) => {
  return (
    <input
      minLength={3}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      value={valueTitle}
    />
  )
}
