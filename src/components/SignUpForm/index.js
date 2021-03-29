import FormInputs from '../FormInputs'
import Button from '../Button'
import React from 'react'
import { dataUsers } from '../../dataUsers'
import {StyledForm, StyledSection, StyledSelect, StyledP} from './style'
import {StyledLabel} from '../FormInputs/styles'
import {StyledButton} from '../Button/styles'
import axios from 'axios'


class SignUpForm extends React.Component {
  state = {
    name: '',
    password: '',
    passwordconfirm: '',
    email: '',
    userType:'',
    error: '',
  }
  
  handleChange = e =>{
    const {name, value} = e.target
    this.setState({
      [name]: value,
    }) 
  }

  handleSubmit = async e => {
    e.preventDefault()
    const {password, passwordconfirm} = this.state
    if( password !== passwordconfirm){
      this.setState({
        error: 'Las contraseñas no coinciden'
      })
    } else {
      try {
        const { data } = await axios ({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/users/signup',
          data: this.state,
        })
  
        localStorage.setItem('token', data.token)
        this.props.history.push('/coacheslist')
        
      } catch(error){
        this.setState({
          error: error.response.data.error.errors.email.message,
        })
      }
    }
                      
  }

  render () {
    const {name, password, email, passwordconfirm, error} = this.state
    return(
      <StyledForm onSubmit={this.handleSubmit}>
        
        <StyledSection primerColumna>
          <FormInputs 
            id="name"
            type="text"
            name="name"
            onChange={this.handleChange}
            value={name}       
          >
              Nombre completo
          </FormInputs>
          <FormInputs 
            id="email"
            type="email"
            name="email"
            onChange={this.handleChange}
            value={email}               
          >
              Email
          </FormInputs>

          <StyledLabel htmlFor="selectRole">Escoge tu rol</StyledLabel>
          <StyledSelect id="selectRole" name= "userType" onChange={this.handleChange}>
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
            onChange={this.handleChange}
            value={password}                  
          >
            Contraseña
          </FormInputs>
          <FormInputs 
            id="passwordconfirm"
            type="password"
            name="passwordconfirm"
            onChange={this.handleChange}
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
        </StyledSection>
        
      </StyledForm>
    )
  }
  
}

export default SignUpForm