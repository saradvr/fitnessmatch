import React from "react"
import FormInputs from "./components/FormInputs"

function App() {
  return (
    <form>
      <FormInputs 
        type="text" 
        name="email" 
        id="email"
      >
        Email
      </FormInputs>
      <FormInputs 
        type="password" 
        name="password" 
        id="password" 
      >
        Password
      </FormInputs>
   </form>
  );
}

export default App;
