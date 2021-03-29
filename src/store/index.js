import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { coachReducer } from './coachesReducer'
import { specializationReducer } from './specializationsReducer'
import { disciplineReducer } from './disciplinesReducer'
import { pricesRangeReducer } from './pricesRangeReducer'

const rootReducer = combineReducers({
  coachReducer,
  specializationReducer,
  disciplineReducer,
  pricesRangeReducer,
})

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)