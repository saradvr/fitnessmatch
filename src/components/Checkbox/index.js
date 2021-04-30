import {StyledInputCheckbox,StyledInput} from './styles'

function Checkbox ({
  id, 
  value, 
  name, 
  isChecked, 
  handleChange, 
  children, 
  black, 
  disabled, 
  marginLeft
}) {
  return (
    <StyledInputCheckbox black={black}>
      <StyledInput
        type="checkbox" 
        id={id} 
        name={name} 
        value={value} 
        checked={isChecked} 
        onChange={handleChange} 
        disabled={disabled}
        marginLeft={marginLeft}
      /> 
      <label htmlFor={id}>{children}</label>
    </StyledInputCheckbox>
  )
} 

export default Checkbox