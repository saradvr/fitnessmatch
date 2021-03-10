import React from "react"
import Button from "./Button"
import {dataUsers} from "../dataUsers"
import FormInputs from "./FormInputs"

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

  handleSubmit = e => {
    e.preventDefault()
    const {email, password} = this.state
    dataUsers.forEach((dataUser)=> {
      if(dataUser.email === email && dataUser.password === password)
      {
        this.props.history.push("/coachesList")
      } 
    })
    this.setState({
      error: " Incorrect username or password "
    }) 
  }

  render() {
    const {email, password, error} = this.state
    return (
      <form onSubmit={this.handleSubmit}> 
        {error && <p>{error}</p>}
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
        <Button type="submit">
          Entrar
        </Button>
        <p>¿No tienes una cuenta?</p>
        <Link to="/signup">Registrarme</Link>
        <br/>
        <Link to="/#">¿Olvidaste tu contraseña?</Link>
      </form>
    )
  }
}

export default LoginForm