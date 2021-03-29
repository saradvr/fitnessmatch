import React from "react"
import {Provider} from "react-redux"
import LoginForm from "../../components/LoginForm"
import { StyledMain, StyledSection, StyledImage, StyledBackImg } from "./styles"
import girlimg from './login-girl-50.png'
import logo from '../../components/Images/Logo-fondoOscuro.png'


export class Login extends React.Component {

  render() {
    return(
      <Provider>
        <StyledMain>
          <StyledSection primerColumna>
            <StyledBackImg src={girlimg} alt="imagen mujer saltando" />
          </StyledSection>
          <StyledSection>
            <StyledImage src={logo} alt="Logo FitnessMatch" />
            <LoginForm history={this.props.history}/>
          </StyledSection>
        </StyledMain>
      </Provider>
    )
  }
}


