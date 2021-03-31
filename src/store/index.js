import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { coachReducer } from './coachesReducer'
import { specializationReducer } from './specializationsReducer'
import { disciplineReducer } from './disciplinesReducer'
import { pricesRangeReducer } from './pricesRangeReducer'
import { signUpReducer} from './signUpReducer'
<<<<<<< HEAD
=======
import { loginReducer } from "./loginReducer"
>>>>>>> b4b6be0d4c67fdf5d6f7d0c5601c12ee36c6f6a0

const rootReducer = combineReducers({
  coachReducer,
  specializationReducer,
  disciplineReducer,
  pricesRangeReducer,
  signUpReducer,
<<<<<<< HEAD
=======
  loginReducer,
>>>>>>> b4b6be0d4c67fdf5d6f7d0c5601c12ee36c6f6a0
})

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)