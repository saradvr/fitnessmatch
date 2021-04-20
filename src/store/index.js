import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { coachReducer } from './coachesReducer'
import { specializationReducer } from './specializationsReducer'
import { disciplineReducer } from './disciplinesReducer'
import { pricesRangeReducer } from './pricesRangeReducer'
import { signUpReducer} from './signUpReducer'
import { loginReducer } from "./loginReducer"
import { availabilityReducer } from './availabilityReducer'
import { appointmentReducer } from './appointmentsReducer'

const rootReducer = combineReducers({
  coachReducer,
  specializationReducer,
  disciplineReducer,
  pricesRangeReducer,
  signUpReducer,
  loginReducer,
  availabilityReducer,
  appointmentReducer,
})

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)