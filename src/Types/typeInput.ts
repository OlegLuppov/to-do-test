import React from 'react'

export type TypeInputTitle = {
  type: string
  placeholder: string
  value?: string
  autoFocus?: boolean

  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export type TypeInputDate = {
  valueDate: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export type TypeInputCheckbox = {
  completed: boolean
  onChange(): void
}
