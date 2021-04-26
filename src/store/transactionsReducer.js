import axios from "axios"
import { history } from "../utils/history"

const TRANSACTION_SAVING = 'TRANSACTION_SAVING'
const TRANSACTION_ERROR = 'TRANSACTION_ERROR'
const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS'
const TRANSACTION_FINISHED = 'TRANSACTION_FINISHED'

export function saveTransaction(transactionDate, amountPaid, status) {
  return async function (dispatch) {
    dispatch({ type: TRANSACTION_ERROR, payload: ''})
    dispatch({ type: TRANSACTION_SAVING })
    try{
      const token = localStorage.getItem('token')

      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/transactions/',
        headers:{
          Authorization: `Bearer ${token}`,
        },
        data: {
          transactionDate,
          amountPaid,
          status
        }
      }) 
      dispatch({ type: TRANSACTION_SUCCESS, payload: data})
    } catch (error){
      dispatch({ type: TRANSACTION_ERROR, payload: error.message })
      if(error.response !== undefined && error.response.request.status === 401){
        localStorage.removeItem('token')
        alert("Su sesión expiró, ingrese nuevamente.")
        history.push('/login')
      }
    } finally {
      dispatch({ type: TRANSACTION_FINISHED })
    }
  }
}

const initialState = {
  saving: false,
  error: null,
  success: '',
  transaction: {}
}

export function transactionReducer( state = initialState, action ){
  switch(action.type){
    case TRANSACTION_SAVING:
      return {
        ...state,
        saving: true,
      }
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        success: action.payload.message,
        transaction: action.payload.transaction,
      }
    case TRANSACTION_FINISHED:
      return {
        ...state,
        saving: false,
      }
    default:
      return state
  }
}