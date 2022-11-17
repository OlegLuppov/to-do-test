import { createRoot } from 'react-dom/client'
import store from './store/store'
import { Provider } from 'react-redux'
import { App } from './components/app/App'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
