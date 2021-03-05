import React from "react"

class FormInputs extends React.Component {
  render() {
    const {children, type, name, id, value, onChange} = this.props
    return (
      <>
        <label htmlFor={id}>
          {children}
        </label>
        <input 
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
