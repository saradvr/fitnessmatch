const CHANGE_MINFEE = 'CHANGE_MINFEE'
const CHANGE_MAXFEE = 'CHANGE_MAXFEE'

export function changeMinFee(value) {
  return {
    type: CHANGE_MINFEE,
    payload: value,
  }
}

export function changeMaxFee(value) {
  return {
    type: CHANGE_MAXFEE,
    payload: value,
  }
}

const initialState = {
  minFee: 0,
  maxFee: 1000000
}

export function pricesRangeReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_MINFEE:
      return {
        ...state,
        minFee: action.payload,
      }
    case CHANGE_MAXFEE:
      return {
        ...state,
        maxFee: action.payload,
      }
    default:
      return state
  }
}