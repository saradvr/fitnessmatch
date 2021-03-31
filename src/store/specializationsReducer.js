import axios from 'axios'

const SPECIALIZATIONS_LOADING = 'SPECIALIZATIONS_LOADING'
const SPECIALIZATIONS_SUCCESS = 'SPECIALIZATIONS_SUCCESS'
const SPECIALIZATIONS_ERROR = 'SPECIALIZATIONS_ERROR'
const SPECIALIZATIONS_FINISHED = 'SPECIALIZATIONS_FINISHED'
export const SPECIALIZATIONS_CHECKED = 'SPECIALIZATIONS_CHECKED'
export const SPECIALIZATIONS_UNCHECKED = 'SPECIALIZATIONS_UNCHECKED'

export function getSpecializations() {
  return async function(dispatch){
    dispatch({ type: SPECIALIZATIONS_LOADING })
    try {
      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/specializations'
      })
      dispatch({ type: SPECIALIZATIONS_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: SPECIALIZATIONS_ERROR, payload: error })
    } finally {
      dispatch({ type: SPECIALIZATIONS_FINISHED })
    }
  }
}

export function toggleSpecialization(isIncluded, id) {
  return {
    type: isIncluded ? SPECIALIZATIONS_UNCHECKED : SPECIALIZATIONS_CHECKED,
    payload: id,
  }
}

const initialState = {
  specializations: [],
  checkSpecializations: [],
  loading: false,
  error: null,
}

export function specializationReducer(state = initialState, action) {
  switch(action.type) {
    case SPECIALIZATIONS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case SPECIALIZATIONS_SUCCESS:
      return {
        ...state,
        specializations: action.payload,
      }
    case SPECIALIZATIONS_ERROR:
      return {
        ...state,
        specializations: action.payload,
      }
    case SPECIALIZATIONS_FINISHED:
      return {
        ...state,
        loading: false,
      }
    case SPECIALIZATIONS_CHECKED:
      return {
        ...state,
        checkSpecializations: [...state.checkSpecializations, action.payload]
      }
    case SPECIALIZATIONS_UNCHECKED:
      return {
        ...state,
        checkSpecializations: state.checkSpecializations.filter(item => item !== action.payload)
      }
    default:
      return state
  }
}