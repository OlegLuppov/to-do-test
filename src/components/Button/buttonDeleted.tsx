import React from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ButtonProps } from '../../interfaces/interfaceButton'

export const ButtonDeleted: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <DeleteIcon sx={{ color: 'red' }} />
    </IconButton>
  )
}
