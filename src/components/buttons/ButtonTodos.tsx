import React from 'react'
import { TypeButton } from './typeButton'
import './button.less'

export const Button: React.FC<TypeButton> = ({ nameButton, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      {nameButton}
    </button>
  )
}
