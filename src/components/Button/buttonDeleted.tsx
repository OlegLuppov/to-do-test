import React from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ButtonProps } from '../../interfaces/interfaceButton'
import { Popup } from '../Popup/Popup'

export const ButtonDeleted: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <IconButton className="deleted" onClick={onClick}>
      <DeleteIcon sx={{ color: '#f44336' }} />
      <Popup namePopup="удалить задачу" />
    </IconButton>
  )
}
