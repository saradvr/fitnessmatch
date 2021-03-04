function Checkbox ({id, value, name, children}) {
    return (
      <>
        <input type="checkbox" id={id} name={name} value={value}/> 
        <label htmlFor={id}>{children}</label>
      </>
    )
  } 

export default Checkbox;