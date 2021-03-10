import React from "react"
import LoginForm from "../../components/LoginForm"
import { StyledMain } from "../ListadoEntrenadores/styles"

export class Login extends React.Component {

  render() {
    return(
      <StyledMain>
        <LoginForm history={this.props.history}/>
      </StyledMain>
    )
  }
}


