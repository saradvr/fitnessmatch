import React from "react"
import LoginForm from "../../components/LoginForm"
<<<<<<< HEAD
import { StyledMain, StyledSection, StyledImage, StyledBackImg } from "./styles"
import girlimg from './girl-50.png'
import logo from '../../components/Images/Logo-fondoOscuro.png'
=======
import { StyledMain } from "./styles"
>>>>>>> 32bb5b3c3f351f5cf2dfda9a47df015b28df815f

export class Login extends React.Component {

  render() {
    return(
      <StyledMain>
        <StyledSection primerColumna>
          <StyledBackImg src={girlimg} alt="imagen mujer saltando" />
        </StyledSection>
        <StyledSection>
          <StyledImage src={logo} alt="Logo FitnessMatch" />
          <LoginForm history={this.props.history}/>
        </StyledSection>
      </StyledMain>
    )
  }
}


