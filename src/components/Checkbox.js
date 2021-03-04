function Checkbox ({nameFor, nameId, nameValue, name, children}) {
    return (
      <>
        <input type="checkbox" id={nameId} name={name} value={nameValue}/> 
        <label htmlFor={nameFor}>{children}</label>
      </>
    )
  } 

export default Checkbox;