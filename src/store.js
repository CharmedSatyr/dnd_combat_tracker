import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'

import logger from 'redux-logger'

const middleware = []

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

export default createStore(rootReducer, applyMiddleware(...middleware))
