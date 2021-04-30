import FormInputs from '../FormInputs'
import React from 'react'
import {StyledForm, StyledSection, StyledSelect, StyledP, StyledLink, LoginText} from './style'
import {StyledLabel} from '../FormInputs/styles'
import {StyledButton} from '../Button/styles'
import axios from 'axios'
import { changeEmail, changeError, changeName, changePassword, changePasswordConfirm, changeUserType } from '../../store/signUpReducer'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'


function SignUpForm() {
  const history = useHistory()
  const { 
    name, 
    password, 
    passwordconfirm, 
    email, 
    userType, 
    error } = useSelector(({signUpReducer})=> ({
    name: signUpReducer.name,
    password: signUpReducer.password,
    passwordconfirm: signUpReducer.passwordconfirm,
    email: signUpReducer.email,
    userType: signUpReducer.userType,
    error: signUpReducer.error,
  }))

  async function handleSubmit(e){
    e.preventDefault()
    if( password !== passwordconfirm){
      dispatch(changeError('Las contraseñas no coinciden'))
    } else {
      try {
        const { data } = await axios ({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/users/signup',
          data: {
            name,
            password,
            email,
            userType,
          },
        })
  
        localStorage.setItem('token', data.token)
        localStorage.setItem('userKind', data.userKind)
        history.push('/coacheslist')
        
      } catch(error){
        dispatch(changeError(error.response.data.error.errors.email.message))
      }
    }                   
  }
    const dispatch = useDispatch()
    return(
      <StyledForm onSubmit={handleSubmit}>
        <StyledSection primerColumna>
          <FormInputs 
            id="name"
            type="text"
            name="name"
            onChange={(e) => dispatch(changeName(e.target.value))}
            value={name}       
          >
              Nombre completo
          </FormInputs>
          <FormInputs 
            id="email"
            type="email"
            name="email"
            onChange={(e) => dispatch(changeEmail(e.target.value))}
            value={email}               
          >
              Email
          </FormInputs>

          <StyledLabel htmlFor="selectRole">Escoge tu rol</StyledLabel>
          <StyledSelect id="selectRole" name= "userType" onChange={(e) => dispatch(changeUserType(e.target.value))}>
            <option value="">Selecciona una opción</option>
            <option value="client">Cliente</option>
            <option value="coach">Entrenador</option>
          </StyledSelect>
        </StyledSection>
        <StyledSection>
          <FormInputs 
            id="password"
            type="password"
            name="password"
            onChange={(e) => dispatch(changePassword(e.target.value))}
            value={password}                  
          >
            Contraseña
          </FormInputs>
          <FormInputs 
            id="passwordconfirm"
            type="password"
            name="passwordconfirm"
            onChange={(e) => dispatch(changePasswordConfirm(e.target.value))}
            value={passwordconfirm}                  
          >
          Confirmar contraseña
          </FormInputs>
          {error && <StyledP> {error} </StyledP>}
          <StyledButton 
            type="submit"
            registrarme
          >
            Registrarme  
          </StyledButton>
          <LoginText>¿Ya tienes una cuenta? <StyledLink to="/login">Inicia sesión</StyledLink></LoginText>
        </StyledSection>
        
      </StyledForm>
    ) 
}

export default SignUpForm