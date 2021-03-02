import React from "react"

class FormInputs extends React.Component {
  render() {
    const {children, type, name, id} = this.props
    return (
      <form>
        <label htmlFor={id}>
          {children}
        </label>
        <input type={type} name={name} id={id}/>
      </form>
    )
  }
}

class Button extends React.Component {
  render() {
      const {children, type, name, id} = this.props
    return (
      <>
      <label htmlFor={id}>

      </label>
      <button type={type} name={name} id={id} >
        {children}
      </button>
      </>
    )
  }
}


function App() {
  return (
    <section>
   <FormInputs type="text" name="email" id="email">Email</FormInputs>
   <FormInputs 
   type="password" 
   name="password" 
   id="password" 
   >
     Password
  </FormInputs>
  <Button type="submit" name="login" id="login">
    Login
  </Button>
  <Button type="#" name="login" id="login">
    Sign Up
  </Button>
   </section>
  );
}

export default App;
