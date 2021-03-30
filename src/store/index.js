import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { coachReducer } from './coachesReducer'
import { specializationReducer } from './specializationsReducer'
import { disciplineReducer } from './disciplinesReducer'
import { pricesRangeReducer } from './pricesRangeReducer'
import { signUpReducer} from './signUpReducer'
import { loginReducer } from "./loginReducer"

const rootReducer = combineReducers({
  coachReducer,
  specializationReducer,
  disciplineReducer,
  pricesRangeReducer,
  signUpReducer,
  loginReducer,
})

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)