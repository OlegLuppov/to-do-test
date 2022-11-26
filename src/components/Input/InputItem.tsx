import React from 'react'
import './input.less'
import { TypeInputTitle } from '../../Types/typeInput'

export const InputItem: React.FC<TypeInputTitle> = ({
  type,
  placeholder,
  value,
  onChange,
  autoFocus,
}) => {
  return (
    <input
      minLength={3}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      value={value}
      autoFocus={autoFocus}
    />
  )
}
