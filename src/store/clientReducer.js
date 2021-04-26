import axios from 'axios'
import { history } from '../utils/history'

export const CHANGE_WEIGHT = 'CHANGE_WEIGHT'
export const CHANGE_HEIGHT = 'CHANGE_HEIGHT'
export const CHANGE_NAME = 'CHANGE_NAME'
export const METRIC_LOADING = 'METRIC_LOADING'
export const METRIC_LOADED = 'METRIC_LOADED'
export const METRIC_LOADING_FINISHED = 'METRIC_LOADING_FINISHED'
export const METRIC_ERROR = 'METRIC_ERROR'
export const CHANGE_APPOINTMENT = 'CHANGE_APPOINTMENT'
export const CLIENT_INFO_LOADING = 'CLIENT_INFO_LOADING'
export const CLIENT_INFO_LOADED = 'CLIENT_INFO_LOADED'
export const CLIENT_INFO_ERROR = 'CLIENT_INFO_ERROR'
export const SETTING_CLIENT_INFO = 'SETTING_CLIENT_INFO'
export const SETTING_CLIENT_INFO_ERROR = 'SETTING_CLIENT_INFO_ERROR'
export const SETTING_CLIENT_INFO_FINISHED = 'SETTING_CLIENT_INFO_FINISHED'
export const SETTING_CLIENT_INFO_SUCCESSFUL = 'SETTING_CLIENT_INFO_SUCCESSFUL'
export const CLIENT_INFO_LOADING_FINISHED = 'CLIENT_INFO_LOADING_FINISHED'


export function getClient() {
  return async function(dispatch) {
    dispatch({type: CLIENT_INFO_LOADING})
    dispatch({type: CLIENT_INFO_ERROR, payload: ''})
    try {
      const token = localStorage.getItem('token')

      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/clients/client',
        headers: {
          Authorization: `bearer ${token}`,
        }
      })
      dispatch({type: CLIENT_INFO_LOADED, payload: data.client})
    } catch(error){
        dispatch({ type: CLIENT_INFO_ERROR, payload: error.message })
        if(error.response !== undefined && error.response.request.status === 401){
          localStorage.removeItem('token')
          alert("Su sesión expiró, ingrese nuevamente.")
          history.push('/login')
        }
    } finally {
        dispatch({type: CLIENT_INFO_LOADING_FINISHED})
      }
  }
}


export function changeAppointment(value) {
  return {
    type: CHANGE_APPOINTMENT,
    payload: value,
  }
  
}

export function changeWeight(value) {
  return {
    type: CHANGE_WEIGHT,
    payload: value,
  }
}

export function changeHeight(value) {
  return {
    type: CHANGE_HEIGHT,
    payload: value,
  }
}

export function changeName(value) {
  return {
    type: CHANGE_NAME,
    payload: value,
  }
}

const initialState = {
  name: '',
  profilePicture: '',
  weight: 0,
  height: 0,
  metrics: {},
  specializations: [],
  disciplines: [],
  appointments: [],
  client: {},
}

export function clientReducer(state = initialState, action) {
  switch(action.type){
    case CLIENT_INFO_LOADING:
      return {
        ...state,
        loading: true,
      }
    case CLIENT_INFO_LOADED:
      return {
        ...state,
        client: action.payload,
    }
    case CLIENT_INFO_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case CLIENT_INFO_LOADING_FINISHED:
      return {
        ...state,
        loading: false,
      }
    case SETTING_CLIENT_INFO:
      return {
        ...state,
        saving: true,
      }
    case SETTING_CLIENT_INFO_SUCCESSFUL:
      return {
        ...state,
        success: action.payload,
      }
    case SETTING_CLIENT_INFO_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SETTING_CLIENT_INFO_FINISHED:
      return {
        ...state,
        saving: false,
      }
    case CHANGE_WEIGHT:
      return {
        ...state,
        weight: action.payload,
      } 
    case CHANGE_HEIGHT:
      return {
        ...state,
        height: action.payload,
      }
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      } 
    case CHANGE_APPOINTMENT:
      return {
        ...state,
        appointments: action.payload,
      } 
  default:
      return state
  }
}