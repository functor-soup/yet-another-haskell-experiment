import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import Form from './components/form.jsx'
import List from './components/list.jsx'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

let store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))

render(
	  <Provider store={store}>
            <div>
	     <Form />
	     <List />
            </div>
	  </Provider>,
	  document.getElementById('root')
)
