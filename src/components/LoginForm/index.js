import React from "react"
import Button from "../Button"
import FormInputs from "../FormInputs"
import { LinkButton } from "../LinkButton"
import {StyledLabel} from "../FormInputs/styles"
import { StyledLink } from "../StyledLink"
import {useDispatch, useSelector} from "react-redux"
import { StyledForm, StyledSection, StyledParagraph } from "./styles"
import axios from "axios"
import { changeEmail, changePassword, changeError } from "../../store/loginReducer"
import { useHistory } from "react-router-dom"

const LoginForm = function() {
 
  const history = useHistory()
  
  const dispatch = useDispatch()
  const { email, password, error } = useSelector(state => {
    return {
      email: state.loginReducer.email,
      password: state.loginReducer.password,
      error: state.loginReducer.error,
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/signin',
        data: {
          email,
          password,
        }
      })

      localStorage.setItem('token', data.token)
      
      const { userKind } = data
  
      if(userKind === "coach") {
        history.push('/profile')
      } else {
        history.push('/clientprofile')
      }
      
    
    } catch(error){
      dispatch(changeError())
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}> 
      <StyledSection primerColumna>
        <FormInputs 
          type="text" 
          name="email" 
          id="email" 
          value={email}
          onChange={(e) => dispatch(changeEmail(e.target.value))}
        >
          Email
        </FormInputs>
        <FormInputs 
          type="password" 
          name="password" 
          id="password"
          value={password} 
          onChange={(e) => dispatch(changePassword(e.target.value))}
        >
          Password
        </FormInputs>
        {error && <StyledParagraph>{error}</StyledParagraph>}
        <StyledLink to="/#">¿Olvidaste tu contraseña?</StyledLink>
        <Button type="submit">
          Iniciar Sesión
        </Button>
      </StyledSection>
      <StyledSection>
        <StyledLabel>¿No tienes una cuenta?</StyledLabel>
        <LinkButton to="/signup">Registrarme</LinkButton>
      </StyledSection>
    </StyledForm>
  )
}

export default LoginForm