import React from 'react'
import { ButtonProps } from './typeButton'
import './button.less'

export const Button: React.FC<ButtonProps> = ({ name, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      {name}
    </button>
  )
}
