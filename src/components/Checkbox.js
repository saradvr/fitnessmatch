function Checkbox ({nameFor, nameId, nameValue, children}) {
    return (
      <>
        <input type="checkbox" id={nameId} value={nameValue}/> 
        <label htmlFor={nameFor}>{children}</label>
      </>
    )
  } 

export default Checkbox;