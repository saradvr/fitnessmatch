import React from "react"
import {StyledInput} from "./styles"

class FormInputs extends React.Component {
  render() {
    const {children, type, name, id, value, onChange} = this.props
    return (
      <>
        <label htmlFor={id}>
          {children}
        </label>
        <StyledInput 
          type={type} 
          name={name} 
          id={id} 
          value={value} 
          onChange={onChange}
        />
      </>
    )
  }
}
  
  export default FormInputs;
