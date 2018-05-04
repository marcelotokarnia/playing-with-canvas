import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './css/style.css'
import App from './components/App'
import store from './store'

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

render(<Root />, document.querySelector('#app'))
