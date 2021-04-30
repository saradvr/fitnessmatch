import axios from "axios"
import { history } from "../utils/history"

const APPOINTMENT_ERROR = 'APPOINTMENT_ERROR'
const APPOINTMENT_SAVING = 'APPOINTMENT_SAVING'
const APPOINTMENT_SAVING_SUCCESS = 'APPOINTMENT_SAVING_SUCCESS'
const APPOINTMENT_SAVING_FINISHED = 'APPOINTMENT_SAVING_FINISHED'
const APPOINTMENT_LOADING = 'APPOINTMENT_LOADING'
const APPOINTMENT_LOADING_SUCCESS = 'APPOINTMENT_LOADING_SUCCESS'
const APPOINTMENT_LOADING_FINISHED = 'APPOINTMENT_LOADING_FINISHED'

export function getAppointment(appointmentId){
  return async function(dispatch){
    dispatch({ type: APPOINTMENT_ERROR, payload: ''})
    dispatch({ type: APPOINTMENT_LOADING })
    try{
      const token = localStorage.getItem('token')

      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/appointments/get/${appointmentId}`,
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: APPOINTMENT_LOADING_SUCCESS, payload: data})
    } catch (error){
      dispatch({ type: APPOINTMENT_ERROR, payload: error.message })
      if(error.response !== undefined && error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/login')
      }
    } finally {
      dispatch({ type: APPOINTMENT_LOADING_FINISHED })
    }
  }
}

export function setAppointment(appointmentDate, coachId, status){
  return async function(dispatch){
    dispatch({ type: APPOINTMENT_ERROR, payload: ''})
    dispatch({ type: APPOINTMENT_SAVING })
    try{
      const token = localStorage.getItem('token')

      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/appointments/',
        headers:{
          Authorization: `Bearer ${token}`,
        },
        data: {
          appointmentDate,
          coachId,
          status
        }
      }) 
      dispatch({ type: APPOINTMENT_SAVING_SUCCESS, payload: data})
    } catch (error){
      dispatch({ type: APPOINTMENT_ERROR, payload: error.message })
      if(error.response !== undefined && error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/login')
      }
    } finally {
      dispatch({ type: APPOINTMENT_SAVING_FINISHED })
    }
  }
}

export function deleteAppointment(appointmentId, coachId){
  return async function(dispatch){
    dispatch({ type: APPOINTMENT_ERROR, payload: ''})
    dispatch({ type: APPOINTMENT_SAVING })
    try{
      const token = localStorage.getItem('token')

      const { data } = await axios({
        method: 'DELETE',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/appointments/delete',
        headers:{
          Authorization: `Bearer ${token}`,
        },
        data: {
          appointmentId,
          coachId,
        }
      }) 
      dispatch({ type: APPOINTMENT_SAVING_SUCCESS, payload: data})
    } catch (error){
      dispatch({ type: APPOINTMENT_ERROR, payload: error.message })
      if(error.response !== undefined && error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/login')
      }
    } finally {
      dispatch({ type: APPOINTMENT_SAVING_FINISHED })
    }
  }
}

export function updateAppointment(appointmentId, status){
  return async function(dispatch){
    dispatch({ type: APPOINTMENT_ERROR, payload: ''})
    dispatch({ type: APPOINTMENT_SAVING })
    try{
      const token = localStorage.getItem('token')

      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/appointments/update',
        headers:{
          Authorization: `Bearer ${token}`,
        },
        data: {
          appointmentId,
          status,
        }
      }) 
      dispatch({ type: APPOINTMENT_SAVING_SUCCESS, payload: data})
    } catch (error){
      dispatch({ type: APPOINTMENT_ERROR, payload: error.message })
      if(error.response !== undefined && error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/login')
      }
    } finally {
      dispatch({ type: APPOINTMENT_SAVING_FINISHED })
    }
  }
}


const initialState = {
  error: null,
  saving: null,
  loading: null,
  successLoading: '',
  success: '',
  appointment: {}
}

export function appointmentReducer(state = initialState, action) {
  switch(action.type) {
    case APPOINTMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case APPOINTMENT_SAVING:
      return {
        ...state,
        saving: true,
      }
    case APPOINTMENT_LOADING:
      return {
        ...state,
        loading: true,
      }
    case APPOINTMENT_SAVING_SUCCESS:
      return {
        ...state,
        success: action.payload.message,
        appointment: action.payload.appointment,
      }
    case APPOINTMENT_LOADING_SUCCESS:
      return {
        ...state,
        successLoading: action.payload.message,
        appointment: action.payload.appointment,
      }
    case APPOINTMENT_SAVING_FINISHED:
      return {
        ...state,
        saving: false,
      }
      case APPOINTMENT_LOADING_FINISHED:
        return {
          ...state,
          loading: false,
        }
    default:
      return state
  }
}