import {StyledInputCheckbox,StyledInput} from './styles'

function Checkbox ({id, value, name, isChecked, handleChange, children}) {
  return (
    <StyledInputCheckbox>
      <StyledInput
        type="checkbox" 
        id={id} 
        name={name} 
        value={value} 
        checked={isChecked} 
        onChange={handleChange} 
      /> 
      <label htmlFor={id}>{children}</label>
    </StyledInputCheckbox>
  )
} 

export default Checkbox