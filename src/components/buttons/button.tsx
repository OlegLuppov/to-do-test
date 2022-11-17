import React from 'react'
import { TypeButton } from './typeButton'
import './button.less'

// Создаем компанент Header
export const Button: React.FC<TypeButton> = ({ nameButton, className }) => {
  return <button className={className}>{nameButton}</button>
}
