import React from "react"
import {StyledInput, StyledLabel} from "./styles"

class FormInputs extends React.Component {
  render() {
    const {children, type, name, id, value, onChange} = this.props
    return (
      <>
        <StyledLabel htmlFor={id}>
          {children}
        </StyledLabel>
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
