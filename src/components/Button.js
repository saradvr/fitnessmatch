import React from 'react'


function Button ({type, children, handleClick}){

  return (
    <button 
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  )
    
}



export default Button;
