import React from 'react'
import { IPopup } from '../../interfaces/interfacePopup'

export const Popup: React.FC<IPopup> = ({ namePopup }) => {
  return (
    <div className="popup">
      <span>{namePopup}</span>
    </div>
  )
}
