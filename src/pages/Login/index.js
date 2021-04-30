import React from "react"
import LoginForm from "../../components/LoginForm"
import { StyledMain, StyledSection, StyledImage, StyledBackImg, StyledLink } from "./styles"
import girlimg from './login-girl-50.png'
import logo from '../../components/Images/Logo-fondoOscuro.png'



export class Login extends React.Component {

  render() {
    return(
      <StyledMain>
        <StyledSection primerColumna>
          <StyledBackImg src={girlimg} alt="imagen mujer saltando" />
        </StyledSection>
        <StyledSection>
          <StyledLink to="/"><StyledImage src={logo} alt="Logo FitnessMatch" /></StyledLink>
          <LoginForm />
        </StyledSection>
      </StyledMain>
    )
  }
}


