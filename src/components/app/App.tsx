import React from 'react'
import './reset.less'
import './fonts.less'
import './app.less'
import { Header } from '../Header/Header'
import { Main } from '../main/Main'

// Создаем главный компонент App в который бубут импортированы все остальные компаненты
export const App: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  )
}
