import React from "react"
import FormInputs from "./components/FormInputs"

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
  {/* <Button type="submit" name="login" id="login">
    Login
  </Button> */}
  {/* <Button type="#" name="login" id="login">
    Sign Up
  </Button> */}
   </section>
  );
}

export default App;
