import React from 'react'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { ButtonProps } from '../../interfaces/interfaceButton'
import { Popup } from '../Popup/Popup'

export const ButtonEditContent: React.FC<ButtonProps> = ({ onClick, className, name }) => {
  return (
    <IconButton
      className={className}
      onClick={onClick}
      name={name}
      sx={{
        position: 'relative',
      }}
    >
      <EditIcon />
      <Popup namePopup="редактировать зaдачу" />
    </IconButton>
  )
}
