import React from "react"
import Button from "../Button"
import {dataUsers} from "../../dataUsers"
import FormInputs from "../FormInputs"
import { LinkButton } from "../LinkButton"
import { StyledForm, StyledSection, StyledDiv, StyledParagraph } from "./styles"
import {StyledLabel} from "../FormInputs/styles"
import { StyledLink } from "../StyledLink"
import axios from "axios"


class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
    error: null,
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      const {data} = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/signin',
        data: this.state
      })

      localStorage.setItem('token', data.token)
      this.props.history.push('/coacheslist')
    
    } catch(error){
      this.setState({
      error: `Usuario o contraseña inválido`
    })
    }
  }

  render() {
    const {email, password, error} = this.state
    return (
      <StyledForm onSubmit={this.handleSubmit}> 
        <StyledSection primerColumna>
          <FormInputs 
            type="text" 
            name="email" 
            id="email" 
            value={email}
            onChange={this.handleChange}
          >
            Email
          </FormInputs>
          <FormInputs 
            type="password" 
            name="password" 
            id="password"
            value={password} 
            onChange={this.handleChange}
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
}

export default LoginForm