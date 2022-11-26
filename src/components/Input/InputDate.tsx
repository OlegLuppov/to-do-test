import React from 'react'
import { TypeInputDate } from '../../Types/typeInput'

export const InputDate: React.FC<TypeInputDate> = ({ valueDate, onChange }) => {
  return <input onChange={onChange} type="date" value={valueDate} />
}
