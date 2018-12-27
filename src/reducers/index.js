import creatures from './creatures'
import experience from './experience'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({ creatures, experience })

export default rootReducer
