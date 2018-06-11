import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allGlasses from './glasses'
import singleGlasses from './singleGlasses'
import cart from './cart'
import reviews from './review'

const reducer = combineReducers({
  user,
  allGlasses,
  singleGlasses,
  cart,
  reviews
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './glasses'
export * from './singleGlasses'
export * from './cart'
export * from './review'
