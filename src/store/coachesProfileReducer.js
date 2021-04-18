const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION'
const CHANGE_EXPERIENCE = 'CHANGE_EXPERIENCE'
const CHANGE_PRICE = 'CHANGE_PRICE'
const CHANGE_ESPECIALIZATIONS = 'CHANGE_ESPECIALIZATIONS'
const CHANGE_DISCIPLINES = 'CHANGE_DISCIPLINES'
const EDIT_PROFILE = 'EDIT_PROFILE'

export function changeName(value){
  return {
    type: CHANGE_NAME,
    payload: value,
  }
}

export function changeDescription(value){
  return {
    type: CHANGE_DESCRIPTION,
    payload: value,
  }
}

export function changeExperience(value){
  return {
    type: CHANGE_EXPERIENCE,
    payload: value,
  }
}

export function changePrice(value){
  return {
    type: CHANGE_PRICE,
    payload: value,
  }
}

export function changeEspecializations(value){
  return {
    type: CHANGE_ESPECIALIZATIONS,
    payload: value,
  }
}

export function changeDisciplines(value){
  return {
    type: CHANGE_DISCIPLINES,
    payload: value,
  }
}

export function editProfile(value){
  return {
    type: EDIT_PROFILE,
    payload: value,
  }
}



const initialState = {
  name: '',
  description: '',
  experience: '',
  price: '',
  especializations: [],
  disciplines: [],
  edit: false,
}


export function coachesProfileReducer (state = initialState, action){
  switch(action.type){
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      }
    case CHANGE_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      }
    case CHANGE_EXPERIENCE:
      return {
        ...state,
        experience: action.payload,
      }
    case CHANGE_PRICE:
      return {
        ...state,
        price: action.payload,
      }
    case CHANGE_ESPECIALIZATIONS:
      return {
        ...state,
        especializations: action.payload,
      }
    case CHANGE_DISCIPLINES:
      return {
        ...state,
        disciplines: action.payload,
      }
    case EDIT_PROFILE:
      return {
        ...state,
        edit: action.payload,
      }
    default:
      return state
  } 
}