import axios from 'axios'
import { history } from '../utils/history'
export const HOURS_CHECKED = 'HOURS_CHECKED'
export const HOURS_UNCHECKED = 'HOURS_UNCHECKED'
export const AVAILABILITY_ERROR = 'AVAILABILITY_ERROR'
export const AVAILABILITY_SAVING = 'AVAILABILITY_SAVING'
export const AVAILABILITY_SAVING_SUCCESS = 'AVAILABILITY_SAVING_SUCCESS'
export const AVAILABILITY_SAVING_FINISHED = 'AVAILABILITY_SAVING_FINISHED'
export const AVAILABILITY_LOADING = 'AVAILABILITY_LOADING'
export const AVAILABILITY_LOADING_SUCCESS = 'AVAILABILITY_LOADING_SUCCESS'
export const AVAILABILITY_LOADING_FINISHED = 'AVAILABILITY_LOADING_FINISHED'

export function getAvailability() {
  return async function(dispatch){
    dispatch({ type: AVAILABILITY_LOADING })
    dispatch({ type: AVAILABILITY_ERROR, payload: ''})
    try {
      const token = localStorage.getItem('token')
      
      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/coaches/coach',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      dispatch({ type: AVAILABILITY_LOADING_SUCCESS, payload: data.coach.availableHours})
    } catch (error) {
      dispatch({ type: AVAILABILITY_ERROR, payload: error.message })
      if(error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/login')
      }
    } finally {
      dispatch({ type: AVAILABILITY_LOADING_FINISHED })
    }
  }
}

export function setAvailability({availableHours}) {
  return async function(dispatch){
    dispatch({ type: AVAILABILITY_SAVING })
    
    try {
      const token = localStorage.getItem('token')
      
      const {data} = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/coaches/profile/availability',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          availableHours
        }
      })
      dispatch({ type: AVAILABILITY_SAVING_SUCCESS, payload: data.message})
    } catch (error) {
      dispatch({ type: AVAILABILITY_ERROR, payload: error.message })
      if(error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/login')
      }
    } finally {
      dispatch({ type: AVAILABILITY_SAVING_FINISHED })
    }
  }
}

export function toggleHour(isIncluded, id) {
  return {
    type: isIncluded ? HOURS_UNCHECKED : HOURS_CHECKED,
    payload: id,
  }
}

const initialState = {
  availableHours: [],
  coach: {},
  error: null,
  saving: false,
  success: '',
}

export function availabilityReducer(state = initialState, action) {
  switch(action.type) {
    case HOURS_CHECKED:
      return {
        ...state,
        availableHours: [...state.availableHours, action.payload],
        success: 'No ha guardado sus cambios'
      }
    case HOURS_UNCHECKED:
      return {
        ...state,
        availableHours: state.availableHours.filter(item => item !== action.payload),
        success: 'No ha guardado sus cambios'
      }
    case AVAILABILITY_LOADING:
      return {
        ...state,
        loading: true,
      }
    case AVAILABILITY_SAVING:
      return {
        ...state,
        saving: true,
      }
    case AVAILABILITY_SAVING_SUCCESS:
      return {
        ...state,
        success: action.payload,
      }
    case AVAILABILITY_LOADING_SUCCESS:
      return {
        ...state,
        availableHours: action.payload,
      }
    case AVAILABILITY_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case AVAILABILITY_SAVING_FINISHED:
      return {
        ...state,
        saving: false,
      }
    case AVAILABILITY_LOADING_FINISHED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}