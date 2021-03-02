import React from 'react'


function Button ({type, children, handleClick, handleClickArg}){

  return (
    <button 
      type={type}
      onClick={handleClick(handleClickArg)}
    >
      {children}
    </button>
  )
    
}



export default Button;