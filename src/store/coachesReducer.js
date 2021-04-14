import axios from 'axios'
import qs from 'qs'
import { history } from '../utils/history'

const COACHES_LOADING = 'COACHES_LOADING'
const COACHES_SUCCESS = 'COACHES_SUCCESS'
const COACHES_ERROR = 'COACHES_ERROR'
const COACHES_FINISHED = 'COACHES_FINISHED'



export function getCoaches(params) {
  return async function(dispatch){
    dispatch({ type: COACHES_LOADING })
    dispatch({ type: COACHES_ERROR, payload: '' })
    try {
      const token = localStorage.getItem('token')
      
      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/coaches',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" })
        }
      })
      dispatch({ type: COACHES_SUCCESS, payload: data})
    } catch (error) {
      dispatch({ type: COACHES_ERROR, payload: error })
      if(error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/login')
      }
    } finally {
      dispatch({ type: COACHES_FINISHED })
    }
  }
}

const initialState = {
  coaches: [],
  loading: false,
  error: null,
}

export function coachReducer(state = initialState, action) {
  switch(action.type) {
    case COACHES_LOADING:
      return {
        ...state,
        loading: true,
      }
    case COACHES_SUCCESS:
      return {
        ...state,
        coaches: action.payload,
      }
    case COACHES_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case COACHES_FINISHED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}