import FormInputs from './FormInputs'
import Button from './Button'
import React from 'react'

class SignUpForm extends React.Component {
  state = {
    name: '',
    password: '',
    email: '',
    role:'',
  }
  
  handleChange = e =>{
    const {name, value} = e.target
    // console.log(value)
    console.dir(e.target)
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = e =>{
    e.preventDefault()
    console.log(this.state)
  }
  render () {
    const {name, password, email,} =this.state
    return(
      <form onSubmit={this.handleSubmit}>
        <FormInputs 
          id="name"
          type="text"
          name="name"
          onChange={this.handleChange}
          value={name}       
        >
            Nombre de usuario
        </FormInputs>
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
          id="email"
          type="email"
          name="email"
          onChange={this.handleChange}
          value={email}               
        >
            Email
        </FormInputs>
        <label htmlFor="selectRole">Escoge tu rol</label>
         <select id="selectRole" name= "role" onChange={this.handleChange}>
         <option value="">Selecciona una opcion</option>
          <option value="cliente">Cliente</option>
          <option value="entrenador">Entrenador</option>
         </select>
        
        
        <Button 
          type="submit"
        >
          Registrarme  
        </Button>
      </form>
    )
  }
  
}

export default SignUpForm