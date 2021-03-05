import React from "react"

class FormInputs extends React.Component {
  render() {
    const {children, type, name, id, onChange, value} = this.props
    return (
      <>
        <label htmlFor={id}>
          {children}
        </label>
        <input type={type} name={name} id={id} onChange={onChange} value={value} />
      </>
    )
  }
}
  
  export default FormInputs;
