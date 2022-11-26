import React from 'react'
import { Checkbox } from '@mui/material'
import { TypeInputCheckbox } from '../../Types/typeInput'

export const InputCheckBox: React.FC<TypeInputCheckbox> = ({ completed, onChange }) => {
  return (
    <Checkbox
      checked={completed}
      onChange={onChange}
      sx={{
        color: '#4caf50',
        '&.Mui-checked': { color: '#4caf50' },
      }}
    />
  )
}
