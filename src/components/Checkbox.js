function Checkbox ({id, value, name, isChecked, handleChange, children}) {
    return (
      <>
        <input 
          type="checkbox" 
          id={id} 
          name={name} 
          value={value} 
          checked={isChecked} 
          onChange={handleChange} 
        /> 
        <label htmlFor={id}>{children}</label>
      </>
    )
  } 

export default Checkbox;