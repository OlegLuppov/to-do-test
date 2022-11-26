import React from 'react'
import { TypeLabel } from '../../../Types/typeLabel'
import './label.less'

export const Label: React.FC<TypeLabel> = ({ titleLabel, className }) => {
  return <label className={className}>{titleLabel}</label>
}
