export const CHANGE_EMAIL = 'CHANGE_EMAIL'
export const CHANGE_PASSWORD = "CHANGE_PASSWORD"
export const CHANGE_ERROR = 'CHANGE_ERROR'

export function changeEmail(value) {
  return {
    type: CHANGE_EMAIL,
    payload: value,
  }
}

export function changePassword() {
  return {
    type: CHANGE_PASSWORD,
  }
}

export function changeError() {
  return {
    type: CHANGE_ERROR,
  }
}

const initialState = {
  email: "",
  password: "",
  error: null,
}

function loginReducer(state, action) {
  switch(action.type) {
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    default:
      return state
  }
}

