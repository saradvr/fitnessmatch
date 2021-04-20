const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION'
const CHANGE_EXPERIENCE = 'CHANGE_EXPERIENCE'
const CHANGE_PRICE = 'CHANGE_PRICE'
const CHANGE_SPECIALIZATIONS = 'CHANGE_SPECIALIZATIONS'
const CHANGE_DISCIPLINES = 'CHANGE_DISCIPLINES'
const EDIT_PROFILE = 'EDIT_PROFILE'
const CHANGE_ERROR = 'CHANGE_ERROR'
export const SPECIALIZATIONS_CHECKED = 'SPECIALIZATIONS_CHECKED'
export const SPECIALIZATIONS_UNCHECKED = 'SPECIALIZATIONS_UNCHECKED'
export const DISCIPLINES_CHECKED = 'DISCIPLINES_CHECKED'
export const DISCIPLINES_UNCHECKED = 'DISCIPLINES_UNCHECKED'
export const GET_COACH = 'GET_COACH'


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

export function changespecializations(value){
  return {
    type: CHANGE_SPECIALIZATIONS,
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

export function changeError(value){
  return {
    type: CHANGE_ERROR,
    payload: value,
  }
}

export function toggleSpecialization(isIncluded, id) {
  return {
    type: isIncluded ? SPECIALIZATIONS_UNCHECKED : SPECIALIZATIONS_CHECKED,
    payload: id,
  }
}

export function toggleDiscipline(isIncluded, id) {
  return {
    type: isIncluded ? DISCIPLINES_UNCHECKED : DISCIPLINES_CHECKED,
    payload: id,
  }
}


const initialState = {
  name: '',
  description: '',
  experience: '',
  price: '',
  specializations: [],
  checkSpecializations: [],
  disciplines: [],
  checkDisciplines: [],
  edit: false,
  error: '',
  coach: {},
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
    case GET_COACH:
    return {
      ...state,
      coach: action.payload,
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
    case CHANGE_SPECIALIZATIONS:
      return {
        ...state,
        specializations: action.payload,
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
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
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