import React from "react"
import LoginForm from "../components/LoginForm"

class Login extends React.Component {

  render() {
    return(
      <main>
        <LoginForm history={this.props.history}/>
      </main>
    )
  }
}

export default Login
