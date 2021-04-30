import React from 'react'
import SignUpForm from '../../components/SignUpForm/index'
import {StyledMain, StyledSection, StyledBackImg, StyledImage, StyledLink} from './styles'
import guyImg from './boy-50.png'
import logo from '../../components/Images/Logo-fondoOscuro.png'

export class SignUp extends React.Component {

  render(){
    return (
      <StyledMain>
        <StyledSection primerColumna>
          <StyledLink to="/"><StyledImage src={logo} alt="logo fitnessMatch"/></StyledLink>
          <SignUpForm history={this.props.history}/>
        </StyledSection> 
        <StyledSection>
          <StyledBackImg src={guyImg} alt="Hombre levantando pesas"/>
        </StyledSection>
      </StyledMain>
    )
  }
}