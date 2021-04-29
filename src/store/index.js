import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { coachReducer } from './coachesReducer'
import { clientReducer } from './clientReducer'
import { specializationReducer } from './specializationsReducer'
import { disciplineReducer } from './disciplinesReducer'
import { pricesRangeReducer } from './pricesRangeReducer'
import { signUpReducer} from './signUpReducer'
import { loginReducer } from "./loginReducer"
import { availabilityReducer } from './availabilityReducer'
import { appointmentReducer } from './appointmentsReducer'
import { transactionReducer } from './transactionsReducer'

const appReducer = combineReducers({
  coachReducer,
  clientReducer,
  specializationReducer,
  disciplineReducer,
  pricesRangeReducer,
  signUpReducer,
  loginReducer,
  availabilityReducer,
  appointmentReducer,
  transactionReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)