import axios from 'axios'

const DISCIPLINES_LOADING = 'DISCIPLINES_LOADING'
const DISCIPLINES_SUCCESS = 'DISCIPLINES_SUCCESS'
const DISCIPLINES_ERROR = 'DISCIPLINES_ERROR'
const DISCIPLINES_FINISHED = 'DISCIPLINES_FINISHED'
export const DISCIPLINES_CHECKED = 'DISCIPLINES_CHECKED'
export const DISCIPLINES_UNCHECKED = 'DISCIPLINES_UNCHECKED'

export function getDisciplines() {
  return async function(dispatch){
    dispatch({ type: DISCIPLINES_LOADING })
    try {
      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/disciplines'
      })
      dispatch({ type: DISCIPLINES_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: DISCIPLINES_ERROR, payload: error })
    } finally {
      dispatch({ type: DISCIPLINES_FINISHED })
    }
  }
}

export function toggleDiscipline(isIncluded, id) {
  return {
    type: isIncluded ? DISCIPLINES_UNCHECKED : DISCIPLINES_CHECKED,
    payload: id,
  }
}

export function addDiscipline(id) {
  return {
    type: DISCIPLINES_CHECKED,
    payload: id,
  }
}

const initialState = {
  disciplines: [],
  checkDisciplines: [],
  loading: false,
  error: null,
}

export function disciplineReducer(state = initialState, action) {
  switch(action.type) {
    case DISCIPLINES_LOADING:
      return {
        ...state,
        loading: true,
      }
    case DISCIPLINES_SUCCESS:
      return {
        ...state,
        disciplines: action.payload,
      }
    case DISCIPLINES_ERROR:
      return {
        ...state,
        disciplines: action.payload,
      }
    case DISCIPLINES_FINISHED:
      return {
        ...state,
        loading: false,
      }
    case DISCIPLINES_CHECKED:
      return {
        ...state,
        checkDisciplines: [...state.checkDisciplines, action.payload]
      }
    case DISCIPLINES_UNCHECKED:
      return {
        ...state,
        checkDisciplines: state.checkDisciplines.filter(item => item !== action.payload)
      }
    default:
      return state
  }
}