import FormInputs from '../FormInputs'
import Button from '../Button'
import React from 'react'
import { dataUsers } from '../../dataUsers'
import {StyledForm, StyledSection, StyledSelect} from './style'
import {StyledLabel} from '../FormInputs/styles'
import {StyledButton} from '../Button/styles'


class SignUpForm extends React.Component {
  state = {
    name: '',
    password: '',
    passwordconfir: '',
    email: '',
    role:'',
    error: null,
  }
  
  handleChange = e =>{
    const {name, value} = e.target
    this.setState({
      [name]: value,
    }) 
  }

  handleSubmit = e => {
    e.preventDefault()
    const {email, password, passwordconfir} = this.state
    const correo = dataUsers.some(dataUser =>{
      return dataUser.email === email    
    })
    if (!correo && password === passwordconfir){
         this.props.history.push("/coachesList")
    } else if (correo){
      this.setState({
        error: 'El correo ya esta en uso'
      })
    } else {
      this.setState({
        error: 'Las contraseñas no coinciden'
      })
    }           
  }

  render () {
    const {name, password, email, passwordconfir, error} = this.state
    return(
      <StyledForm onSubmit={this.handleSubmit}>
        {error && <p>{error}</p>}
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
          <StyledSelect id="selectRole" name= "role" onChange={this.handleChange}>
          <option value="">Selecciona una opcion</option>
            <option value="cliente">Cliente</option>
            <option value="entrenador">Entrenador</option>
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
            id="passwordconfir"
            type="password"
            name="passwordconfir"
            onChange={this.handleChange}
            value={passwordconfir}                  
          >
          Confirmar contraseña
          </FormInputs>
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