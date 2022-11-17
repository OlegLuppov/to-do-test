import React from 'react'
import './input.less'
import { TypeInput } from './typeInput'

export const InputTitle: React.FC<TypeInput> = ({ type, placeholder }) => {
  return <input type={type} placeholder={placeholder} />
}
