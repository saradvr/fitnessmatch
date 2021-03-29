import React from "react"
import Button from "../Button"
import FormInputs from "../FormInputs"
import { LinkButton } from "../LinkButton"
import {StyledLabel} from "../FormInputs/styles"
import { StyledLink } from "../StyledLink"
import {useDispatch, useSelector} from "react-redux"
import { StyledForm, StyledSection, StyledParagraph } from "./styles"
import axios from "axios"
import { changeEmail, changePassword } from "../../store/loginReducer"

const LoginForm = function() {
  // handleSubmit = async e => {
  //   e.preventDefault()

  //   try {
  //     const {data} = await axios({
  //       method: 'POST',
  //       baseURL: process.env.REACT_APP_SERVER_URL,
  //       url: '/users/signin',
  //       data: this.state
  //     })

  //     localStorage.setItem('token', data.token)
  //     this.props.history.push('/coacheslist')
    
  //   } catch(error){
  //     this.setState({
  //     error: `Usuario o contraseña inválido`
  //   })
  //   }
  // }
  // const {email, password, error} = this.state
  // const dispatch = useDispatch()
  // const { email, password } = useSelector(state => {
  //   console.log(state)
  //   return {
  //     email: state.loginReducer.email,
  //     password: state.loginReducer.password,
  //   }
  // })
  const email = ""
  const password = ""
  return (
    <StyledForm onSubmit={this.handleSubmit}> 
      <StyledSection primerColumna>
        <FormInputs 
          type="text" 
          name="email" 
          id="email" 
          value={email}
          // onChange={(e) => dispatch(changeEmail(e.target.value))}
        >
          Email
        </FormInputs>
        <FormInputs 
          type="password" 
          name="password" 
          id="password"
          value={password} 
          // onChange={(e) => dispatch(changePassword(e.target.value))}
        >
          Password
        </FormInputs>
        {/* {error && <StyledParagraph>{error}</StyledParagraph>} */}
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